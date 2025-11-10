<script>
	import { T } from '@threlte/core';
	import { Environment, OrbitControls, Gizmo } from '@threlte/extras';
	import { Color } from 'three';

	let { scene } = $props();

	scene.background = new Color('#FFFFFF');
</script>

<T.AmbientLight intensity={0.5} />
<Environment isBackground={false} url={'/images/hdrs/room.hdr'} />

<T.PerspectiveCamera makeDefault position={[1, 1, 4]} near={0.001}>
	<OrbitControls enableDamping={true} dampingFactor={0.05} enableZoom={true} target={[0, 1, 0]}>
		<Gizmo />
	</OrbitControls>
</T.PerspectiveCamera>
