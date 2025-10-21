<script lang="ts">
	import { T, useThrelte, useTask } from '@threlte/core';
	import {
		ContactShadows,
		Environment,
		interactivity,
		OrbitControls,
		Gizmo,
		TransformControls,
		Sky
	} from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import Drawer from './parts/Drawer.svelte';
	import { onMount } from 'svelte';
	import Module from './parts/Module.svelte';
	import { Color, MOUSE, RectAreaLight, SpotLight } from 'three';
	import Architecture from './architecture/Architecture.svelte';
	import Cabinet from './primitives/Cabinet.svelte';
	import Block from './primitives/Block.svelte';
	import { debug } from '../../stores/Debug.svelte';

	let { scene } = useThrelte();
	console.log(scene);

	let { room } = $props();

	// let skybox = $state.raw();

	interactivity();

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

	let elapsed = $state(0);
	useTask((delta) => {
		elapsed += delta;
		// block.width = 1 + Math.sin(elapsed * 1) * 0.1;
	});

	// const sky = {
	// 	azimuth: 180,
	// 	elevation: 30,
	// 	exposure: 0.65,
	// 	mieCoefficient: 0.002,
	// 	mieDirectionalG: 0.86,
	// 	rayleigh: 0.3,
	// 	turbidity: 4.78
	// };
</script>

<!-- ENVIRONMENT -->

<!-- <Sky {...sky} /> -->
<Environment isBackground={true} url={'/images/hdrs/room.hdr'} />
<!-- {ground} -->
<!-- bind:skybox -->

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

<!-- CAMERA -->

<T.PerspectiveCamera makeDefault position={[1, 1, 4]} near={0.001}>
	<OrbitControls enableDamping={true} dampingFactor={0.05} enableZoom={true} target={[0, 1, 0]}>
		<!-- mouseButtons={{
			MIDDLE: MOUSE.ROTATE,
			RIGHT: MOUSE.PAN
		}} -->
		<Gizmo />
	</OrbitControls>
</T.PerspectiveCamera>

<!-- SHADOWS -->

<!-- <ContactShadows opacity={0.4} scale={10} blur={2} far={2.5} resolution={512} color="#000000" /> -->

<!-- MODELS -->

<!-- ARCHITECTURE -->
<Architecture />

<!-- <Drawer /> -->
<!-- <Module /> -->
{#each room.cabinets as cabinet}
	<Cabinet {cabinet} />
{/each}
