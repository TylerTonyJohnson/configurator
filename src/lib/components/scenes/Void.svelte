<script>
	import { onDestroy } from 'svelte';
	import { T } from '@threlte/core';
	import { Environment, OrbitControls, Gizmo } from '@threlte/extras';
	import { Color } from 'three';

	let { scene } = $props();

	const originalBackground = scene.background;
	const originalEnvRotation = scene.environmentRotation?.y;
	const originalEnvIntensity = scene.environmentIntensity;
	const originalBgRotation = scene.backgroundRotation?.y;

	scene.background = new Color('#FFFFFF');
	// scene.environmentRotation.y = 0;
	// scene.environmentIntensity = 0.5;
	// scene.backgroundRotation.y = 0;

	onDestroy(() => {
		console.log('Destroying Void');
		// Restore original values
		scene.background = originalBackground;
		if (originalEnvRotation !== undefined) scene.environmentRotation.y = originalEnvRotation;
		if (originalEnvIntensity !== undefined) scene.environmentIntensity = originalEnvIntensity;
		if (originalBgRotation !== undefined) scene.backgroundRotation.y = originalBgRotation;
	});
</script>

<T.AmbientLight intensity={0.5} />
<Environment isBackground={false} url={'/images/hdrs/room.hdr'} />
