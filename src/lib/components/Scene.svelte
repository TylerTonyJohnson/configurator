<script>
	import { T, useTask } from '@threlte/core';
	import { interactivity, OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import Drawer from './parts/Drawer.svelte';

	interactivity();

	const scale = new Spring(1);

	let rotation = $state(0);
	useTask((delta) => {
		rotation += delta;
	});

	const group = $state({
		position: [0, 0.1, 0],
		width: 0.5,
		height: 0.3,
		depth: 0.4,
		panels: [
			{ width: 0.01, height: 0.05, depth: 0.04, position: [0, 0.15, 0], rotation: [0, 0, 0] }, // Top panel
			{ width: 0.01, height: 0.05, depth: 0.04, position: [0, -0.15, 0], rotation: [0, 0, 0] }, // Bottom panel
			{
				width: 0.01,
				height: 0.05,
				depth: 0.04,
				position: [-0.25, 0, 0],
				rotation: [0, Math.PI / 2, 0]
			}, // Left panel
			{
				width: 0.01,
				height: 0.05,
				depth: 0.04,
				position: [0.25, 0, 0],
				rotation: [0, Math.PI / 2, 0]
			}, // Right panel
			{
				width: 0.01,
				height: 0.05,
				depth: 0.04,
				position: [0, 0, -0.2],
				rotation: [Math.PI / 2, 0, 0]
			}, // Back panel
			{
				width: 0.01,
				height: 0.05,
				depth: 0.04,
				position: [0, 0, 0.2],
				rotation: [Math.PI / 2, 0, 0]
			} // Front panel
		]
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[1, 1, 1]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}
>
	<OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.PointLight position={[1, 1, 1]} intensity={5} />

<!-- <T.Mesh
	rotation.y={rotation}
	position.y={1}
	scale={scale.current}
	onpointerenter={() => {
		scale.target = 1.5;
	}}
	onpointerleave={() => {
		scale.target = 1;
	}}
	castShadow
>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial color="hotpink" />
</T.Mesh> -->
<!-- <T.Group position={group.position}>
	{#each group.panels as panel}
		<T.Mesh position={panel.position} rotation={panel.rotation} castShadow>
			<T.BoxGeometry args={[panel.width, panel.height, group.depth]} />
			<T.MeshStandardMaterial color="tan" />
		</T.Mesh>
	{/each}
</T.Group> -->

<Drawer />

<!-- <T.Mesh rotation.x={-Math.PI / 2} receiveShadow>
	<T.CircleGeometry args={[4, 40]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh> -->
