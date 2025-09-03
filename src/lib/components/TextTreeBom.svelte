<script>
	let { data = {} } = $props();
</script>

<!-- Frame -->
<div class="frame">
	{@render renderNode(data)}
</div>

<!-- Reference -->
{#snippet renderNode(node, depth = 0)}
	<div class="line">
		<span>{'\t'.repeat(depth)}</span>

		<span
			class:selectable={node.action === 'Choice'}
			class:required={node.required}
			class:choice={node.action === 'Choice'}
		>
			{node.label}
		</span>
	</div>

	{#if node.children && node.children.length}
		{#each node.children as child}
			{@render renderNode(child, depth + 1)}
		{/each}
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
		outline: solid red 1px;
	}

	.choice {
		color: green;
	}
</style>
