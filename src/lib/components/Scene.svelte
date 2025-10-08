<script>
	import { T, useThrelte, useTask } from '@threlte/core';
	import { ContactShadows, Environment, interactivity, OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import Drawer from './parts/Drawer.svelte';
	import { onMount } from 'svelte';
	import Module from './parts/Module.svelte';

	let { scene } = useThrelte();

	let skybox = $state.raw();

	interactivity();

	const ground = { height: 15, radius: 100 };

	const radius = 0.5;

	const y = ground.height - radius - 0.1;

	$effect(() => {
		skybox?.position.setY(y);
	});

	const envOffset = 0.671951839;

	scene.environmentRotation.y = envOffset;
	scene.backgroundRotation.y = envOffset;
</script>

<!-- ENVIRONMENT -->

<Environment isBackground={true} url={'/images/hdrs/room.hdr'} backgroundIntensity={1} />
<!-- bind:skybox -->
<!-- {ground} -->

<!-- LIGHTS -->
<T.DirectionalLight intensity={10} position={[0, 5, 0]} castShadow />

<!-- CAMERA -->

<T.PerspectiveCamera
	makeDefault
	position={[-0.5, 0.5, 0]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}
	near={0.001}
>
	<OrbitControls enableDamping={true} dampingFactor={0.05} />
</T.PerspectiveCamera>

<!-- SHADOWS -->

<!-- <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" /> -->

<!-- MODELS -->

<!-- <Drawer /> -->
 <Module />
