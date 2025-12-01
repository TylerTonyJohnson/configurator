<script>
	import { T } from '@threlte/core';
	import { Environment, OrbitControls, Gizmo } from '@threlte/extras';
</script>

<T.PerspectiveCamera makeDefault position={[1, 1, 4]} near={0.001}>
	<OrbitControls enableDamping={true} dampingFactor={0.05} enableZoom={true} target={[0, 1, 0]}>
		<Gizmo />
	</OrbitControls>
</T.PerspectiveCamera>
