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
	import Cabinet from './primitives/Cabinet.svelte';
	import Block from './primitives/Block.svelte';
	import { debug } from '../../stores/Debug.svelte';
	import Room from './scenes/Room.svelte';
	import Void from './scenes/Void.svelte';

	let { scene } = useThrelte();
	console.log(scene);

	let { room } = $props();

	interactivity();

	let elapsed = $state(0);
	useTask((delta) => {
		elapsed += delta;
		// block.width = 1 + Math.sin(elapsed * 1) * 0.1;
	});
</script>

<!-- ENVIRONMENT -->
<!-- <Room {scene} /> -->
<Void {scene} />

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

<!-- MODELS -->

<!-- <Drawer /> -->
<!-- <Module /> -->
{#each room.cabinets as cabinet}
	<Cabinet {cabinet} />
{/each}
