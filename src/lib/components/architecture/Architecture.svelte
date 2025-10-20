<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import { Button, Checkbox, Pane, Slider, Stepper, ThemeUtils } from 'svelte-tweakpane-ui';
	import { Controls, Mesh } from 'three';
	import { debug } from '../../../stores/Debug.svelte';
	import Wall from '$lib/components/architecture/Wall.svelte';
	import Floor from '$lib/components/architecture/Floor.svelte';

	type Orientation = 'wall' | 'open';

	let orientation = $state<Orientation>('wall');

	const room = $state({
		width: 4,
		height: 2,
		depth: 2,
		thickness: 0.1,
		textureScale: 3
	});
</script>

<!-- FLOOR PLANE -->
<Floor position={[0, 0, room.depth / 2]} width={room.width} depth={room.depth} />

<!-- WALLS -->

<!-- Back -->
<Wall
	position={[0, room.height / 2, -room.thickness / 2]}
	rotation={[0, 0, 0]}
	length={room.width + room.thickness}
	height={room.height}
	thickness={room.thickness}
	textureScale={room.textureScale}
/>

<!-- Front -->
<!-- <Wall
	position={[0, room.height / 2, room.depth / 2]}
	rotation={[0, Math.PI, 0]}
	length={room.width}
	height={room.height}
	thickness={room.thickness}
/> -->

<!-- Left -->
<Wall
	position={[-room.width / 2, room.height / 2, room.depth / 2]}
	rotation={[0, Math.PI / 2, 0]}
	length={room.depth}
	height={room.height}
	thickness={room.thickness}
	textureScale={room.textureScale}
/>

<!-- Right -->
<Wall
	position={[room.width / 2, room.height / 2, room.depth / 2]}
	rotation={[0, -Math.PI / 2, 0]}
	length={room.depth}
	height={room.height}
	thickness={room.thickness}
	textureScale={room.textureScale}
/>

<!-- <T.Mesh position={[0, 1, -room.depth / 2]} rotation={[0, 0, 0]}>
	<T.BoxGeometry args={[room.width, room.height, room.thickness]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh> -->

<!-- <T.Mesh position={[-room.width / 2, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
	<T.BoxGeometry args={[room.depth, room.height, room.thickness]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh> -->
<!-- 
<T.Mesh position={[room.width / 2, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
	<T.BoxGeometry args={[room.depth, room.height, room.thickness]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh> -->

<!-- CONTROL PANE -->
<!-- <Pane position={'fixed'}>
	<Slider label="Room Width" min={2} max={20} step={0.1} bind:value={room.width} />
	<Slider label="Room Height" min={2} max={10} step={0.1} bind:value={room.height} />
	<Slider label="Room Depth" min={2} max={20} step={0.1} bind:value={room.depth} />
	<Slider label="Wall Thickness" min={0.05} max={0.5} step={0.01} bind:value={room.thickness} />
	<Slider label="Texture Scale" min={0.1} max={5} step={0.1} bind:value={room.textureScale} />
	<Checkbox label="Show Debug" bind:checked={debug} />
</Pane> -->
