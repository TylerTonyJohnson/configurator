<script>
	import { T } from '@threlte/core';

	let { length = 500, width = 300, thickness = 19 } = $props();
</script>

<T.Mesh>
	<T.BoxGeometry args={[length / 1000, thickness / 1000, width / 1000]} />
	<T.MeshStandardMaterial color="tan" />
</T.Mesh>

<style>
</style>
