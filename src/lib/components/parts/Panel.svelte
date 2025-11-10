<script lang="ts">
	import { T } from '@threlte/core';

	let { moduleHeight, panelThickness, materialSides, moduleWidth } = $props();
</script>

<T.Mesh
	position={[0, moduleHeight / 2, panelThickness / 2]}
	rotation={[Math.PI / 2, 0, 0]}
	material={materialSides}
>
	<T.BoxGeometry args={[moduleWidth, panelThickness, moduleHeight]} />
</T.Mesh>
