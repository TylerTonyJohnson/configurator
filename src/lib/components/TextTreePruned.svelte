<script>
	let { data = {} } = $props();

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
<!-- {#snippet renderNode(node, depth = 0)}

	{#if node.children || node.action === 'Choose 1' || node.action === 'Boolean'}
		<div class="line">
			
			<span>{'\t'.repeat(depth)}</span>

		
			<span class:required={node.required} class:choice={node.action === 'Choice'}>
				{node.label}
			</span>

			{#if node.action === 'Choose 1' || node.action === 'Boolean'}
	
				<span>:</span>

				{#if node.selection}
					<span class="selection">{node.selection.label}</span>
				{:else}
					<span>None</span>
				{/if}
			{/if}
		</div>
	{/if}
	{#if node.children && node.children.length}
		{#each node.children as child}
			{@render renderNode(child, depth + 1)}
		{/each}
	{/if}
{/snippet} -->

{#snippet renderNode(node, parent = null, depth = 0)}
	<!-- What is shown per line -->

	<!-- Only rendering parents -->
	{#if node.type === 'decision' || node.type === 'root'}
		<!-- Container per line -->
		<div class="line">
			<!-- Spacing -->
			<span>{'\t'.repeat(depth)}</span>

			<!-- Start with label of node -->
			<span class:required={node.required} class:choice={node.action === 'Choice'}>
				{node.label}
			</span>

			<!-- Colon -->
			<span>:</span>

			<!-- Types of questions -->
			{#if node?.action === 'Choose 1'}
				{#if node.selection}
					<span class="selection">{node.selection.label}</span>
				{:else}
					<span>None</span>
				{/if}
			{:else if node?.action === 'Boolean'}
				<span class="selection">{node.selection}</span>
			{/if}

			<!-- Render children -->
			{#if node.children && node.children.length}
				{#each node.children as child}
					{@render renderNode(child, node, depth + 1)}
				{/each}
			{/if}
		</div>
	{/if}
{/snippet}

<style>
	.frame {
		tab-size: 3;
	}

	.line {
		white-space: pre;
		font-family: monospace;
		padding: 1px 0;
	}

	.selectable {
		background-color: pink;
		padding: 1px 4px;
		cursor: pointer;
	}

	.required {
		position: relative;
	}

	.required::before {
		content: '*';
		position: absolute;
		top: 0;
		right: 100%;
		color: red;
	}

	.choice {
		color: green;
	}

	.selection {
		color: blue;
		outline: solid blue 1px;
	}
</style>
