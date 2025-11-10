<script lang="ts">
	import { T, useThrelte, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';

	import Void from './scenes/Void.svelte';
	import { Group, MeshStandardMaterial } from 'three';
	import Panel from './parts/Panel.svelte';
	import Module from '$lib/components/modules/Module.svelte.ts';
	import { mod } from 'three/src/nodes/TSL.js';

	let { scene } = useThrelte();
	console.log(scene);

	let { room } = $props();

	interactivity();

	let elapsed = $state(0);
	useTask((delta) => {
		elapsed += delta;
		// block.width = 1 + Math.sin(elapsed * 1) * 0.1;
	});

	const materialSides = [
		new MeshStandardMaterial({ color: 'orange' }),
		new MeshStandardMaterial({ color: 'orange' }),
		new MeshStandardMaterial({ color: 'white' }),
		new MeshStandardMaterial({ color: 'saddlebrown' }),
		new MeshStandardMaterial({ color: 'orange' }),
		new MeshStandardMaterial({ color: 'orange' })
	];
	const module = new Module({ type: 'open', height: 0.3 });

	const panelThickness = 0.019;
	const panelOffset = 0.005;

	const doorWidth = module.width / 2 - panelOffset * 2;
	const doorHeight = module.height - panelOffset * 2;

	// Create module instance

	function handleClick(event: any) {
		if (event.intersections) {
			const faceIndex = event.intersections[0].faceIndex;
			console.log(event.intersections);
			const face = Math.floor(faceIndex / 2); // BoxGeometry has 2 triangles per face

			// const faceNames = ['right', 'left', 'top', 'bottom', 'front', 'back'];
			// console.log('Clicked face:', faceNames[face]);

			switch (face) {
				case 0:
					console.log('Right face clicked');
					module.width += 0.1;
					break;
				case 1:
					console.log('Left face clicked');
					module.width -= 0.1;
					break;
				case 2:
					console.log('Top face clicked');
					module.height += 0.1;
					break;
				case 3:
					console.log('Bottom face clicked');
					module.height -= 0.1;
					break;
				case 4:
					console.log('Front face clicked');
					module.depth += 0.1;
					break;
				case 5:
					console.log('Back face clicked');
					module.depth -= 0.1;
					break;
			}
		}
	}
</script>

<!-- ROOM -->
<Void {scene} />

<!-- CABINETS -->

<!-- RAW MODULE -->
<T.Group>
	<!-- ORIGIN -->
	<T.Mesh>
		<T.SphereGeometry args={[0.02, 16, 16]} />
		<T.MeshBasicMaterial color="red" />
	</T.Mesh>

	{#each module.anchors as position}
		<T.Mesh {position}>
			<T.SphereGeometry args={[0.02, 16, 16]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
	{/each}

	<!-- OUTLINE -->
	<T.Mesh position={[0, module.height / 2, module.depth / 2]}>
		<T.BoxGeometry args={[module.width, module.height, module.depth]} />
		<T.MeshBasicMaterial wireframe={true} color="red" />
	</T.Mesh>
	<T.Mesh position={[0, module.height / 2, module.depth / 2]} onclick={handleClick}>
		<T.BoxGeometry args={[module.width, module.height, module.depth]} />
		<T.MeshBasicMaterial color="lime" transparent opacity={0.5} />
	</T.Mesh>

	<!-- PANELS -->
	{#each module.anchors as anchor}
		<T.Mesh position={[...anchor]} rotation={[Math.PI / 2, 0, 0]} material={materialSides}>
			<T.BoxGeometry args={[module.width, panelThickness, module.height]} />
		</T.Mesh>
	{/each}

	<!-- Back Panel -->
	<!-- <T.Mesh
			position={[0, module.height / 2, panelThickness / 2]}
			rotation={[Math.PI / 2, 0, 0]}
			material={materialSides}
		>
			<T.BoxGeometry args={[module.width, panelThickness, module.height]} />
		</T.Mesh> -->

	<!-- Left Door -->
	<!-- <T.Group
			position={[
				-(doorWidth / 2 + panelOffset),
				doorHeight / 2 + panelOffset,
				module.depth - panelThickness / 2
			]}
			rotation={[Math.PI / 2, 0, Math.PI]}
		>
			<T.Mesh material={materialSides}>
				<T.BoxGeometry args={[doorWidth, panelThickness, doorHeight]} />
			</T.Mesh>
		</T.Group> -->

	<!-- Right Door -->
	<!-- <T.Group
			position={[
				doorWidth / 2 + panelOffset,
				doorHeight / 2 + panelOffset,
				module.depth - panelThickness / 2
			]}
			rotation={[Math.PI / 2, 0, Math.PI]}
		>
			<T.Mesh material={materialSides}>
				<T.BoxGeometry args={[doorWidth, panelThickness, doorHeight]} />
			</T.Mesh>
		</T.Group> -->

	<!-- Left -->
	<!-- <T.Mesh
			position={[-(module.width / 2 - panelThickness / 2), module.height / 2, module.depth / 2]}
			rotation={[Math.PI / 2, 0, -Math.PI / 2]}
			material={materialSides}
		>
			<T.BoxGeometry args={[module.depth - panelThickness * 2, panelThickness, module.height]} />
		</T.Mesh> -->

	<!-- Right -->
	<!-- <T.Mesh
			position={[module.width / 2 - panelThickness / 2, module.height / 2, module.depth / 2]}
			rotation={[Math.PI / 2, 0, Math.PI / 2]}
			material={materialSides}
		>
			<T.BoxGeometry args={[module.depth - panelThickness * 2, panelThickness, module.height]} />
		</T.Mesh> -->

	<!-- Bottom -->
	<!-- <T.Mesh
			position={[0, panelThickness / 2, module.depth / 2]}
			rotation={[0, 0, 0]}
			material={materialSides}
		>
			<T.BoxGeometry
				args={[
					module.width - panelThickness * 2,
					panelThickness,
					module.depth - panelThickness * 2
				]}
			/>
		</T.Mesh> -->

	<!-- Top -->
	<!-- <T.Mesh
			position={[0, module.height - panelThickness / 2, module.depth / 2]}
			rotation={[Math.PI, 0, 0]}
			material={materialSides}
		>
			<T.BoxGeometry
				args={[
					module.width - panelThickness * 2,
					panelThickness,
					module.depth - panelThickness * 2
				]}
			/>
		</T.Mesh> -->
</T.Group>
