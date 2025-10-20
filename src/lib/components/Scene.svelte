<script lang="ts">
	import { T, useThrelte, useTask } from '@threlte/core';
	import {
		ContactShadows,
		Environment,
		interactivity,
		OrbitControls,
		Gizmo,
		TransformControls
	} from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import Drawer from './parts/Drawer.svelte';
	import { onMount } from 'svelte';
	import Module from './parts/Module.svelte';
	import { MOUSE } from 'three';
	import Architecture from './architecture/Architecture.svelte';
	import Cabinet from './primitives/Cabinet.svelte';
	import Block from './primitives/Block.svelte';
	import { debug } from '../../stores/Debug.svelte';

	let { scene } = useThrelte();

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

	scene.environmentRotation.y = envOffset;
	scene.backgroundRotation.y = envOffset;

	let elapsed = $state(0);
	useTask((delta) => {
		elapsed += delta;
		// block.width = 1 + Math.sin(elapsed * 1) * 0.1;
	});
</script>

<!-- ENVIRONMENT -->

<Environment isBackground={true} url={'/images/hdrs/room.hdr'} />
<!-- {ground} -->
<!-- bind:skybox -->

<!-- LIGHTS -->
<T.DirectionalLight intensity={5} position={[1, 1, 1]} castShadow>
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

<!-- <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" /> -->

<!-- MODELS -->

<!-- ARCHITECTURE -->
<Architecture /> 

<!-- <Drawer /> -->
<!-- <Module /> -->
{#each room.cabinets as cabinet}
	{#each cabinet.blocks as block}
		<Block {block} />
	{/each}
{/each}
