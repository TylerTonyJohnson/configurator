<script>
	import { T } from '@threlte/core';
	import { useTexture, RoundedBoxGeometry } from '@threlte/extras';

	import { MeshStandardMaterial, NoColorSpace, RepeatWrapping, SRGBColorSpace } from 'three';

	// Props

	let { length = 500, width = 300, thickness = 19, position = [0, 0, 0] } = $props();

	// Constants

	// const displacementScale = 0.01;
	const textureScale = 10;

	// Load Textures

	const textures = useTexture(
		{
			map: '/images/textures/plywood/diffuse.png',
			normalMap: '/images/textures/plywood/normal.png',
			ormMap: '/images/textures/plywood/orm.png'
			// displacementMap: '/images/textures/plywood/displacement.png',
		},
		{
			transform: (texture, key) => {
				// Set texture wrapping
				texture.wrapS = texture.wrapT = RepeatWrapping;
				texture.repeat.set(textureScale, textureScale);

				// Set color space
				if (key === 'map') texture.colorSpace = SRGBColorSpace;
				else texture.colorSpace = NoColorSpace;
				return texture;
			}
		}
	);
</script>

{#await textures then { map, normalMap, displacementMap, ormMap }}
	<T.Mesh position={position.map((v) => v / 1000)} castShadow receiveShadow>
		<!-- material={createScaledMaterials(textureReady)} -->
		<T.BoxGeometry
			args={[length / 1000, thickness / 1000, width / 1000, 1, 1, 1]}
			oncreate={(ref) => {
				if (ref.attributes.uv && !ref.attributes.uv2) {
					ref.setAttribute('uv2', ref.attributes.uv);
					ref.attributes.uv2.needsUpdate = true;
				}
				// console.log(ref);
			}}
		/>
		<T.MeshStandardMaterial
			{map}
			{normalMap}
			normalScale={[1, 1]}
			{displacementMap}
			aoMap={ormMap}
			aoMapIntensity={1}
			roughnessMap={ormMap}
			roughness={0.2}
			metalnessMap={ormMap}
			oncreate={(ref) => console.log(ref)}
		/>
		<!-- {displacementScale} -->
		<!-- displacementBias={(displacementScale / 2) * -1} -->
		<!-- metalness={1} -->
	</T.Mesh>
{:catch error}
	<!-- promise was rejected -->
{/await}
