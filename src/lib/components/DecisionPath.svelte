<script>
	let { data } = $props();

	function handleClick(node) {
		// node.parent.selection = node;
		// console.log('Set ' + node.parent.label + ' to ' + node.label);
		// console.log(node);

		const parentNode = getNodeById(data, node.parent);
		parentNode.selection = node;
		// console.log(data.children[0]);
	}

	function getNodeById(node, id) {
		if (node.id === id) {
			return node;
		}

		for (const child of node.children ?? []) {
			const found = getNodeById(child, id);
			if (found) return found;
		}
		return null;
	}
</script>

<!-- Frame -->
<div class="frame">
	{@render renderNode(data)}
</div>

<!-- Reference -->
{#snippet renderNode(node, parent = null, depth = 0)}
	<!-- What is shown per line -->

	<!-- Parent label -->
	{#if node.type === 'decision'}
		<div>{node.label}</div>
	{/if}

	<!-- Types of questions -->
	{#if parent?.action === 'Choose 1'}
		<button onclick={() => handleClick(node)}>{node.label}</button>
	{:else if node?.action === 'Boolean'}
		<input type="checkbox" bind:checked={node.selection} />
	{/if}

	<!-- Render children -->
	{#if node.children && node.children.length}
		{#each node.children as child}
			{@render renderNode(child, node, depth + 1)}
		{/each}
	{/if}
{/snippet}

<style>
	.button-column {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.button-row {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	/* CSS */
	.button-30 {
		align-items: center;
		appearance: none;
		background-color: #fcfcfd;
		border-radius: 4px;
		border-width: 0;
		box-shadow:
			rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		box-sizing: border-box;
		color: #36395a;
		cursor: pointer;
		display: inline-flex;
		font-family: 'JetBrains Mono', monospace;
		height: 48px;
		justify-content: center;
		line-height: 1;
		list-style: none;
		overflow: hidden;
		padding-left: 16px;
		padding-right: 16px;
		position: relative;
		text-align: left;
		text-decoration: none;
		transition:
			box-shadow 0.15s,
			transform 0.15s;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		white-space: nowrap;
		will-change: box-shadow, transform;
		font-size: 18px;
	}

	/* Last clicked? */
	.button-30:focus {
		box-shadow:
			#d6d6e7 0 0 0 1.5px inset,
			rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
	}

	/* Hovering */
	.button-30:hover {
		box-shadow:
			rgba(45, 35, 66, 0.4) 0 4px 8px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		transform: translateY(-2px);
	}

	/* Pressing down */
	.button-30:active {
		box-shadow: #d6d6e7 0 3px 7px inset;
		transform: translateY(2px);
	}

	.button-30.chosen {
		outline: solid blue 3px;
	}
</style>
