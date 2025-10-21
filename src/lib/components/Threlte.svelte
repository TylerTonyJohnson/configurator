<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import Room from './architecture/Room.svelte.ts';
	import { Button, Checkbox, Folder, Pane, Slider } from 'svelte-tweakpane-ui';
	import { debug } from '../../stores/Debug.svelte.ts';

	const room = new Room();

	const cabinet = room.addCabinet({ width: 0.8, height: 0.6, depth: 0.4 });
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
