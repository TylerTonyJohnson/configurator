<script>
	import { T, useThrelte } from '@threlte/core';
	import { useTexture, Grid } from '@threlte/extras';

	import { SRGBColorSpace, NoColorSpace, RepeatWrapping } from 'three';

	// Props

	let {
		width = 20,
		depth = 20,
		position = [0, 0, 0],
		rotation = [0, 0, 0],
		textureScale = 1
	} = $props();

	// Constants

	const { invalidate } = useThrelte();

	const repeatX = $derived(width / textureScale);
	const repeatY = $derived(depth / textureScale);

	// Load Textures

	const textures = useTexture(
		{
			map: '/images/textures/laminate/diffuse.jpg',
			normalMap: '/images/textures/laminate/normal.jpg',
			armMap: '/images/textures/laminate/arm.jpg'
		},
		{
			transform: (texture) => {
				// Set texture wrapping
				texture.wrapS = texture.wrapT = RepeatWrapping;
				texture.repeat.set(repeatX, repeatY);

				// Set color space
				texture.colorSpace = texture.image.src.includes('diffuse') ? SRGBColorSpace : NoColorSpace;

				return texture;
			}
		}
	);

	let material = $state(null);

	// Update texture repeats when dimensions change
	$effect(() => {
		if (material) {
			const texturesToUpdate = [
				material.map,
				material.normalMap,
				material.aoMap,
				material.roughnessMap,
				material.metalnessMap
			];

			texturesToUpdate.forEach((texture) => {
				if (texture) {
					texture.repeat.set(repeatX, repeatY);
					texture.needsUpdate = true;
				}
			});

			// Force material update
			material.needsUpdate = true;

			// Trigger re-render
			invalidate();
		}
	});
</script>

{#await textures then { map, normalMap, armMap }}
	<T.Mesh {position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
		<T.PlaneGeometry args={[width, depth]} />
		oncreate={(ref) => {
			if (ref.attributes.uv && !ref.attributes.uv2) {
				ref.setAttribute('uv2', ref.attributes.uv);
				ref.attributes.uv2.needsUpdate = true;
			}
		}}
		<!-- <T.MeshBasicMaterial bind:ref={material} {map} /> -->
		<T.MeshStandardMaterial
			bind:ref={material}
			{map}
			{normalMap}
			normalScale={[2, 2]}
			aoMap={armMap}
			aoMapIntensity={1}
			roughnessMap={armMap}
			roughness={1.0}
			metalnessMap={armMap}
			metalness={0.0}
		/>
	</T.Mesh>

	<Grid
		position={[position[0], position[1] + 0.005, position[2]]}
		gridSize={[width, depth]}
		cellColor="#ffffff"
		sectionColor="#ffffff"
		sectionThickness={0}
		fadeDistance={25}
		cellSize={1}
	/>
{/await}
