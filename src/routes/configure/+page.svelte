<script lang="ts">
	import Scene from '$lib/components/Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { Button, Checkbox, Folder, Pane, Slider } from 'svelte-tweakpane-ui';
	import { debug } from '$lib/stores/Debug.svelte.ts';
	import Cabinet from '$lib/components/primitives/Cabinet.svelte';
	import Module from '$lib/components/primitives/Module.svelte';
	import Project from '$lib/components/primitives/Project.svelte.ts';
	import Room from '$lib/components/primitives/Room.svelte.ts';

	/* 
		PROJECT
	*/
	let project: Project = $state(new Project());

	// Set up room (void)
	let room = new Room('void');
	// Set up cabinet (default)

	let module = new Module();

	function toggleDebug() {
		debug.enabled = !debug.enabled;
		console.log(debug.enabled);
	}

	function narrow() {
		project.components[0].width -= 0.1;
	}
	function widen() {
		project.components[0].width += 0.1;
	}
	function tallen() {
		project.components[0].height += 0.1;
	}
	function shorten() {
		project.components[0].height -= 0.1;
	}
	function deepen() {
		project.components[0].depth += 0.1;
	}
	function shallow() {
		project.components[0].depth -= 0.1;
	}
</script>

<!-- STRUCTURE -->
<div class="frame">
	<div class="pane full left">
		<Canvas>
			<Scene {project} {room} />
		</Canvas>
	</div>
	<div class="pane full right">
		{#if project}
			<div>READY</div>
			<button onclick={toggleDebug}>Debug</button>
			<div class="button-row">
				<button onclick={() => (room.type = 'void')}>Void</button>
				<button onclick={() => (room.type = 'operatory')}>Operatory</button>
			</div>
			<div class="button-row">
				<button onclick={narrow}>Narrow</button>
				<button onclick={widen}>Widen</button>
			</div>
			<div class="button-row">
				<button onclick={shorten}>Shorten</button>
				<button onclick={tallen}>Tallen</button>
			</div>
			<div class="button-row">
				<button onclick={shallow}>Shallow</button>
				<button onclick={deepen}>Deepen</button>
			</div>
			<!-- <div class="tweaks">
				<Pane position="inline" userExpandable expanded={false} title="Tweaks">
					<Checkbox label="Debug" bind:value={debug.enabled} />
					<Button title="+Cabinet" on:click={() => room.addCabinet()} />
					<Folder title={'Cabinet '}>
						<Slider
							label="Width"
							min={0.1}
							max={5}
							step={0.1}
							bind:value={room.cabinets[0].width}
						/>
						<Slider
							label="Height"
							min={0.1}
							max={5}
							step={0.1}
							bind:value={room.cabinets[0].height}
						/>
						<Slider
							label="Depth"
							min={0.1}
							max={5}
							step={0.1}
							bind:value={room.cabinets[0].depth}
						/>
						<Button title="+Block" on:click={() => room.cabinets[0].addBlock()} />

						{#each room.cabinets[0].blocks as block}
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
			</div> -->
		{/if}
	</div>
</div>

<style>
	.frame {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-template-areas: 'left right';
		gap: 0;
	}

	.button-row {
		margin-top: 1rem;
		padding: 0 0.5rem;
		display: flex;
		place-content: start;
		gap: 0.5rem;
	}

	.pane {
		position: relative;
		border: solid pink 1px;
		padding: 1rem;
		overflow: auto;
		min-width: 0;
		min-height: 0;

		border: 1px solid #ddd;
		box-sizing: border-box;

		&.full {
			padding: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		&.left {
			grid-area: left;
		}
		&.right {
			grid-area: right;
		}
	}
</style>
