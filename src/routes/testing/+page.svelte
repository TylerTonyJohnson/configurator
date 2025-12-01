<script lang="ts">
	import DecisionPath from '$lib/components/DecisionPath.svelte';
	// import TextTreeFull from '$lib/components/TextTreeFull.svelte';
	// import TextTreePruned from '$lib/components/TextTreePruned.svelte';
	// import TextTreeBom from '$lib/components/TextTreeBom.svelte';

	// import orthoGhost from '$lib/data/orthoGhost.json';
	// import orthoBOM from '$lib/data/orthoBOM.json';
	// import OrderedList from '$lib/components/OrderedList.svelte';
	// import Threlte from '$lib/components/Threlte.svelte';
	import Room from '$lib/components/scenes/Operatory.svelte';

	// let bomData = $state();
	// bomData = orthoBOM;

	// let data = $state();
	// $inspect(data);
	//
	// data = hydrateTree(orthoGhost);

	// function hydrateTree(tree) {
	// 	traverse(tree);

	// 	function traverse(node, parent = null, path = '1') {
	// 		// Generate ID
	// 		node.id = node.label + ' ' + path;

	// 		if (node.type === 'root') {
	// 			node.expanded = true;
	// 		} else {
	// 			node.expanded = false;
	// 		}

	// 		// Generate parent
	// 		node.parent = parent?.id;

	// 		// Generate selection variable
	// 		if (node.action === 'Choose 1') node.selection = null;
	// 		if (node.action === 'Boolean') node.selection = false;

	// 		// Traversal
	// 		if (node.children && node.children.length > 0) {
	// 			node.children.forEach((child, i) => {
	// 				traverse(child, node, `${path}.${i + 1}`);
	// 			});
	// 		}
	// 	}
	// 	console.log(tree);
	// 	return tree;
	// }

	let isResizable = $state(false);

	let frame = $state<HTMLDivElement>();
	let isDragging = $state(false);
	let leftPaneWidth = $state(50); // in percentage

	function handlePointerMove(e: PointerEvent) {
		if (frame && isDragging && isResizable) {
			e.preventDefault();

			const frameWidth = frame.offsetWidth;
			const newWidth = e.clientX - frame.offsetLeft;
			const newPercentage = (newWidth / frameWidth) * 100;

			leftPaneWidth = Math.min(Math.max(newPercentage, 10), 90); // constrain between 10% and 90%
		}
	}

	// const room = new Room();
</script>

<svelte:window onpointermove={handlePointerMove} onpointerup={() => (isDragging = false)} />

<div
	class="frame"
	bind:this={frame}
	style="grid-template-columns: {leftPaneWidth}% {100 - leftPaneWidth}%;"
>
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
	<!-- <div class="pane full left">
		<Threlte {room} />
	</div>
	{#if isResizable}
		<div
			class="pane-divider"
			style="left: {leftPaneWidth}%;"
			onpointerdown={() => (isDragging = true)}
		></div>
	{/if}
	<div class="pane full right">
		<button onclick={() => (room.cabinets[0].height += 1)}>Size +</button>
	</div> -->
</div>

<style>
	.frame {
		/* max-width: 100%; */
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-areas: 'left right';
		gap: 0;

		/* border: solid red 2px; */
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
		place-content: center;
		place-items: center;
	}

	.pane-divider {
		position: absolute;
		top: 0;
		translate: -50% 0;
		width: 20px;
		height: 100%;
		/* background-color: red; */
		z-index: 1;
		&:hover {
			cursor: col-resize;
			background-color: blue;
		}
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

		/* border: solid teal 2px; */

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
