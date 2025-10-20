<script>
	import { T, useThrelte } from '@threlte/core';
	import { useTexture, RoundedBoxGeometry } from '@threlte/extras';

	import {
		MeshStandardMaterial,
		NoColorSpace,
		RepeatWrapping,
		MirroredRepeatWrapping,
		SRGBColorSpace
	} from 'three';

	// Props

	let {
		length = 5,
		height = 2,
		thickness = 0.1,
		position = [0, 0, 0],
		rotation = [0, 0, 0],
		textureScale = 1
	} = $props();

	// Constants

	const { invalidate } = useThrelte();

	const repeatX = $derived(length / textureScale);
	const repeatY = $derived(height / textureScale);

	// $inspect(repeatX, repeatY);

	// Load Textures

	const textures = useTexture(
		{
			map: '/images/textures/wall/diffuse.jpg',
			normalMap: '/images/textures/wall/normal.jpg',
			ormMap: '/images/textures/wall/orm.jpg'
		},
		{
			transform: (texture, key) => {
				// Set texture wrapping
				texture.wrapS = texture.wrapT = MirroredRepeatWrapping;

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

{#await textures then { map, normalMap, ormMap }}
	<T.Mesh {position} {rotation} castShadow receiveShadow>
		<!-- material={createScaledMaterials(textureReady)} -->
		<T.BoxGeometry
			args={[length, height, thickness, 1, 1, 1]}
			oncreate={(ref) => {
				if (ref.attributes.uv && !ref.attributes.uv2) {
					ref.setAttribute('uv2', ref.attributes.uv);
					ref.attributes.uv2.needsUpdate = true;
				}
			}}
		/>
		<T.MeshStandardMaterial
			bind:ref={material}
			{map}
			{normalMap}
			normalScale={[1, 1]}
			aoMap={ormMap}
			aoMapIntensity={1}
			roughnessMap={ormMap}
			metalnessMap={ormMap}
		/>
	</T.Mesh>
{:catch error}
	<T.Mesh {position} {rotation}>
		<T.BoxGeometry args={[length, height, thickness]} />
		<T.MeshStandardMaterial color="#cccccc" />
	</T.Mesh>
{/await}
