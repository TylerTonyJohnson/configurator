<!-- <script>
	import { Button, Checkbox, Folder, Pane, Slider } from 'svelte-tweakpane-ui';
	import { debug } from '$lib/stores/Debug.svelte.ts';
</script>

<div class="tweaks">
	<Pane position="inline" userExpandable expanded={false} title="Tweaks">
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
</div> -->
