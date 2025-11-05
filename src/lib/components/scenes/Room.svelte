<script lang="ts">
	import { T } from '@threlte/core';
	import { Environment, TransformControls } from '@threlte/extras';
	import Wall from '$lib/components/architecture/Wall.svelte';
	import Floor from '$lib/components/architecture/Floor.svelte';
	import { Color } from 'three';

	import { debug } from '../../../stores/Debug.svelte';

	let { scene } = $props();

	type Orientation = 'wall' | 'open';

	let orientation = $state<Orientation>('wall');

	const room = $state({
		width: 4,
		height: 2,
		depth: 2,
		thickness: 0.1,
		textureScale: 3
	});

	// let skybox = $state.raw();

	// const sky = {
	// 	azimuth: 180,
	// 	elevation: 30,
	// 	exposure: 0.65,
	// 	mieCoefficient: 0.002,
	// 	mieDirectionalG: 0.86,
	// 	rayleigh: 0.3,
	// 	turbidity: 4.78
	// };

	// const ground = { height: 15, radius: 100 };

	// const radius = 0.5;

	// const y = ground.height - radius - 0.1;

	// $effect(() => {
	// 	skybox?.position.setY(y);
	// });

	const envOffset = 0.671951839;

	scene.background = new Color('#000000');
	scene.environmentRotation.y = envOffset;
	scene.environmentIntensity = 0.4;
	scene.backgroundRotation.y = envOffset;
</script>

<Environment isBackground={true} url={'/images/hdrs/room.hdr'} />

<!-- LIGHTS -->
<T.DirectionalLight
	intensity={3.5}
	position={[8, 6, 4]}
	castShadow
	shadow.bias={-0.0005}
	shadow.normalBias={0.02}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
	shadow.camera.near={0.1}
	shadow.camera.far={20}
	shadow.camera.left={-8}
	shadow.camera.right={8}
	shadow.camera.top={8}
	shadow.camera.bottom={-8}
	color="#ffffff"
>
	{#snippet children({ ref })}
		{#if debug.enabled}
			<T.DirectionalLightHelper attach={scene} args={[ref, 0.1]}>
				{#snippet children({ ref: helper })}
					<TransformControls object={ref} onobjectChange={() => helper.update()} />
				{/snippet}
			</T.DirectionalLightHelper>
		{/if}
	{/snippet}
</T.DirectionalLight>
<T.AmbientLight intensity={0.3} color="#e8f4ff" />
<T.RectAreaLight intensity={2.0} width={1.2} height={0.3} position={[0, 2.8, 0]} color="#f0f5ff" />
<T.RectAreaLight intensity={2.0} width={1.2} height={0.3} position={[2, 2.8, 0]} color="#f0f5ff" />
<T.SpotLight
	intensity={1.5}
	position={[0, 2.5, 0]}
	angle={0.6}
	penumbra={0.5}
	castShadow
	shadow.mapSize.width={1024}
	shadow.mapSize.height={1024}
/>

<!-- <Sky {...sky} /> -->

<!-- {ground} -->
<!-- bind:skybox -->

<!-- SHADOWS -->

<!-- <ContactShadows opacity={0.4} scale={10} blur={2} far={2.5} resolution={512} color="#000000" /> -->

<Floor position={[0, 0, room.depth / 2]} width={room.width} depth={room.depth} />

<!-- WALLS -->

<!-- Back -->
<Wall
	position={[0, room.height / 2, -room.thickness / 2]}
	rotation={[0, 0, 0]}
	length={room.width + room.thickness}
	height={room.height}
	thickness={room.thickness}
	textureScale={room.textureScale}
/>

<!-- Front -->
<!-- <Wall
	position={[0, room.height / 2, room.depth / 2]}
	rotation={[0, Math.PI, 0]}
	length={room.width}
	height={room.height}
	thickness={room.thickness}
/> -->

<!-- Left -->
<Wall
	position={[-room.width / 2, room.height / 2, room.depth / 2]}
	rotation={[0, Math.PI / 2, 0]}
	length={room.depth}
	height={room.height}
	thickness={room.thickness}
	textureScale={room.textureScale}
/>

<!-- Right -->
<Wall
	position={[room.width / 2, room.height / 2, room.depth / 2]}
	rotation={[0, -Math.PI / 2, 0]}
	length={room.depth}
	height={room.height}
	thickness={room.thickness}
	textureScale={room.textureScale}
/>
