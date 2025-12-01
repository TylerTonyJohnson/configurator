<!-- 
    BLOCK

    A 3D Block component with customizable dimensions and texture scaling.
    Used for all equirectangular shapes, like walls and panels.
-->

<script lang="ts">
	import { debug } from '../../stores/Debug.svelte';

	import { T, useThrelte } from '@threlte/core';
	import { TransformControls, useTexture } from '@threlte/extras';

	import {
		NoColorSpace,
		RepeatWrapping,
		MirroredRepeatWrapping,
		SRGBColorSpace,
		Group
	} from 'three';

	// Props

	let { block } = $props();
	// $inspect(block);

	// Constants

	const { invalidate } = useThrelte();

	const repeatX = $derived(block.width / block.textureScale);
	const repeatY = $derived(block.height / block.textureScale);

	// Load Textures

	const textures = useTexture(
		{
			map: block.textures.map,
			normalMap: block.textures.normal,
			armMap: block.textures.arm
		},
		{
			transform: (texture) => {
				// Set texture wrapping
				texture.wrapS = texture.wrapT = MirroredRepeatWrapping;

				// Set color space
				texture.colorSpace = texture.image.src.includes('diffuse') ? SRGBColorSpace : NoColorSpace;

				return texture;
			}
		}
	);

	// let mesh = $state(null);

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

	let groupRef = $state(null);
	let isTransforming = $state(false);

	function handleTransformChange() {
		if (groupRef) {
			if (groupRef.position.y < 0) {
				groupRef.position.y = 0;
			}

			// Update the class position from the Group's position
			block.position.x = groupRef.position.x;
			block.position.y = groupRef.position.y;
			block.position.z = groupRef.position.z;
		}
	}

	// $effect(() => {
	// 	if (block.position.y < 0) block.position.y = 0;
	// });

	// $inspect(block.position);
</script>

{#await textures then { map, normalMap, armMap }}
	<T.Group
		bind:ref={groupRef}
		position={isTransforming ? undefined : [block.position.x, block.position.y, block.position.z]}
		rotation={[block.rotation.x, block.rotation.y, block.rotation.z]}
	>
		<T.Mesh
			position={[block.originOffset.x, block.originOffset.y, block.originOffset.z]}
			castShadow
			receiveShadow
		>
			<T.BoxGeometry
				args={[block.width, block.height, block.depth]}
				oncreate={(ref) => {
					if (ref.attributes.uv && !ref.attributes.uv2) {
						ref.setAttribute('uv2', ref.attributes.uv);
						ref.attributes.uv2.needsUpdate = true;
					}
				}}
			/>
			<!-- <T.MeshStandardMaterial color="tan" /> -->
			<T.MeshStandardMaterial
				bind:ref={material}
				{map}
				{normalMap}
				normalScale={[1, 1]}
				aoMap={armMap}
				aoMapIntensity={1}
				roughnessMap={armMap}
				roughness={0.5}
				metalnessMap={armMap}
				metalness={0.5}
				envMapIntensity={1}
			/>
		</T.Mesh>
	</T.Group>
	{#if groupRef && debug.enabled}
		<TransformControls
			translationSnap={0.1}
			space="world"
			lineWidth={2}
			mode="translate"
			showZ={false}
			showY={true}
			size={0.5}
			object={groupRef}
			onobjectChange={handleTransformChange}
		/>
	{/if}
{/await}
