<script>
	import DecisionPath from '$lib/components/DecisionPath.svelte';
	import TextTreePruned from '$lib/components/TextTreePruned.svelte';
	import TextTreeFull from '$lib/components/TextTreeFull.svelte';

	import orthoGhost from '$lib/data/orthoGhost.json';

	let data = $state();
	$inspect(data);

	data = hydrateTree(orthoGhost);

	function hydrateTree(tree) {
		traverse(tree);

		function traverse(node, parent = null, path = '1') {
			// Generate ID
			node.id = node.label + ' ' + path;

			// Generate parent
			node.parent = parent?.id;

			// Generate selection variable
			if (node.action === 'Choose 1') node.selection = null;
			if (node.action === 'Boolean') node.selection = false;

			// Traversal
			if (node.children && node.children.length > 0) {
				node.children.forEach((child, i) => {
					traverse(child, node, `${path}.${i + 1}`);
				});
			}
		}
		console.log(tree);
		return tree;
	}
</script>

<div class="frame">
	<h1>Ortho Configuration</h1>
	<div class="pane-container">
		<div class="pane">
			<TextTreeFull {data} />
		</div>
		<div class="pane">
			<!-- <textarea rows="10" style="resize: none;">{orthoTarget}</textarea> -->
			<DecisionPath {data} />
		</div>
		<div class="pane">
			<TextTreePruned {data} />
		</div>
	</div>
</div>

<style>
	.frame {
		height: 50%;
		width: 100%;

		display: flex;
		flex-direction: column;
	}

	h1 {
		text-align: center;
		padding: 1rem;
	}

	.pane-container {
		height: 100%;

		display: flex;
		flex-direction: row;
	}

	.pane {
		flex: 1;
		height: 100%;
		border: solid pink 1px;
		padding: 1rem;
		list-style: none;
	}
</style>
