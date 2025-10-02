<script>
	import DecisionPath from '$lib/components/DecisionPath.svelte';
	import TextTreeFull from '$lib/components/TextTreeFull.svelte';
	import TextTreePruned from '$lib/components/TextTreePruned.svelte';
	import TextTreeBom from '$lib/components/TextTreeBom.svelte';

	import orthoGhost from '$lib/data/orthoGhost.json';
	import orthoBOM from '$lib/data/orthoBOM.json';
	import OrderedList from '$lib/components/OrderedList.svelte';
	import Threlte from '$lib/components/Threlte.svelte';

	let bomData = $state();
	bomData = orthoBOM;

	let data = $state();
	$inspect(data);

	data = hydrateTree(orthoGhost);

	function hydrateTree(tree) {
		traverse(tree);

		function traverse(node, parent = null, path = '1') {
			// Generate ID
			node.id = node.label + ' ' + path;

			if (node.type === 'root') {
				node.expanded = true;
			} else {
				node.expanded = false;
			}

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
	<!-- <h1>Ortho Configuration</h1> -->
	<!-- <div class="pane-container">
		<div class="pane">
			<TextTreeFull {data} />
		</div>
		<div class="pane">
			<DecisionPath {data} />
		</div>
		<div class="pane">
			<TextTreePruned {data} />
		</div>
		<div class="pane">
			<TextTreePruned {data} />
		</div>
	</div> -->

	<!-- <OrderedList /> -->
	<Threlte />
</div>

<style>
	.frame {
		height: 100%;
		width: 100%;
	}

	h1 {
		text-align: center;
		padding: 1rem;
	}

	.pane-container {
		flex: 1 1 auto;
		max-height: 90%;

		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, minmax(0, 1fr));
	}

	.pane {
		border: solid pink 1px;
		padding: 1rem;
		overflow: auto;
		min-width: 0;
		min-height: 0;

		border: 1px solid #ddd;
		padding: 0.75rem;
		box-sizing: border-box;
	}
</style>
