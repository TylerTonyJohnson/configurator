<script>
	import DragDropList, { VerticalDropZone, HorizontalDropZone, reorder } from 'svelte-dnd-list';

	import imageDoor from '$lib/images/door.jpg';
	import imageDrawer from '$lib/images/drawer.jpg';
	import imageDesk from '$lib/images/desk.jpg';
	import imageSink from '$lib/images/sink.jpg';

	let images = [imageDoor, imageDrawer, imageDesk, imageSink];

	function onDrop({ detail: { from, to } }) {
		if (!to || from === to) {
			return;
		}
		images = reorder(images, from.index, to.index);
	}
</script>

<div class="frame">
	<h1>Drag and Drop List - Simple Example</h1>

	<DragDropList
		id="example"
		type={HorizontalDropZone}
		itemSize={150}
		itemCount={images.length}
		on:drop={onDrop}
		let:index
	>
		<img class="item" draggable="false" src={images[index]} alt="" />
	</DragDropList>
</div>

<style>
	h1 {
		text-align: center;
		padding: 1rem;
	}

	.item {
		width: 150px;
		height: 150px;
		border: solid green 1px;
		background-color: pink;
		display: grid;
		place-content: center;
		place-items: center;
	}
</style>
