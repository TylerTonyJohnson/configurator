<script>
	import { T } from '@threlte/core';

	let { position = [0, 0, 0], rotation = [0, 0, 0], size = [100, 100], color } = $props();
</script>

<T.Mesh position={[position.x / 1000, position.y / 1000, position.z / 1000]} {rotation}>
	<T.PlaneGeometry args={size.map((v) => v / 1000)} />
	<T.MeshBasicMaterial {color} side={2} transparent opacity={0.5} depthWrite={false}/>
</T.Mesh>
