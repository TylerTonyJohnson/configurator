<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import Room from './architecture/Room.svelte.ts';
	import { Button, Checkbox, Folder, Pane, Slider } from 'svelte-tweakpane-ui';
	import { debug } from '../../stores/Debug.svelte.ts';

	const room = new Room();

	const cabinet = room.addCabinet({ width: 0.8, height: 0.6, depth: 0.4 });
	console.log(cabinet);

	let overhang = 0.01;
	let panelThickness = 0.019;
	let counterThickness = 0.03;
	let drawerHeight = 0.1;
	let handleSize = 0.025;

	// Left Panel
	cabinet.addBlock({
		width: cabinet.depth - overhang,
		height: cabinet.height - counterThickness,
		depth: panelThickness,
		origin: 'right-bottom-back',
		position: { x: -(cabinet.width / 2 - overhang), y: 0, z: 0 },
		rotation: { x: 0, y: Math.PI / 2, z: 0 },
		material: 'plywood'
	});

	// Right Panel
	cabinet.addBlock({
		width: cabinet.depth - overhang,
		height: cabinet.height - counterThickness,
		depth: panelThickness,
		origin: 'left-bottom-back',
		position: { x: cabinet.width / 2 - overhang, y: 0, z: 0 },
		rotation: { x: 0, y: -Math.PI / 2, z: 0 },
		material: 'plywood'
	});

	// Drawer
	cabinet.addBlock({
		width: cabinet.width - 2 * panelThickness - 2 * overhang,
		height: drawerHeight,
		depth: panelThickness,
		origin: 'top-front',
		position: { x: 0, y: cabinet.height - counterThickness, z: cabinet.depth - overhang },
		rotation: { x: 0, y: 0, z: 0 },
		material: 'plywood',
		textureScale: 0.5
	});
	// Handle
	cabinet.addBlock({
		width: handleSize * 5,
		height: handleSize,
		depth: handleSize,
		origin: 'back',
		position: {
			x: 0,
			y: cabinet.height - counterThickness - drawerHeight / 2,
			z: cabinet.depth - overhang
		},
		rotation: { x: 0, y: 0, z: 0 },
		material: 'gold'
	});
	// Counter
	cabinet.addBlock({
		width: cabinet.width,
		height: cabinet.depth,
		depth: counterThickness,
		origin: 'bottom-back',
		position: { x: 0, y: cabinet.height, z: 0 },
		rotation: { x: Math.PI / 2, y: 0, z: 0 },
		material: 'tile',
		textureScale: 0.5
	});
</script>

<Canvas>
	<Scene {room} />
</Canvas>

<Pane position="fixed">
	<Checkbox label="Debug" bind:value={debug.enabled} />
	<Button title="+Cabinet" on:click={() => room.addCabinet()} />
	<Folder title={'Cabinet '}>
		<Slider label="Width" min={0.1} max={5} step={0.1} bind:value={cabinet.width} />
		<Slider label="Height" min={0.1} max={5} step={0.1} bind:value={cabinet.height} />
		<Slider label="Depth" min={0.1} max={5} step={0.1} bind:value={cabinet.depth} />
		<Button title="+Block" on:click={() => cabinet.addBlock()} />

		{#each cabinet.blocks as block}
			<Folder title={'Block '}>
				<Slider label="Width" min={0.01} max={5} step={0.01} bind:value={block.width} />
				<Slider label="Height" min={0.01} max={5} step={0.01} bind:value={block.height} />
				<Slider label="Depth" min={0.01} max={5} step={0.01} bind:value={block.depth} />
				<Slider
					label="Texture Scale"
					min={0.1}
					max={5}
					step={0.1}
					bind:value={block.textureScale}
				/>
			</Folder>
		{/each}
	</Folder>
</Pane>
