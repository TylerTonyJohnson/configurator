<script>
	import { T } from '@threlte/core';
	import { useInteractivity } from '@threlte/extras';

	let { position = $bindable(), color } = $props();

	const { pointer } = useInteractivity();

	const defaultColor = color;
	const activeColor = $derived(isDragging ? 'white' : isHovering ? 'blue' : defaultColor);

	function handlePointerEnter(event) {
		isHovering = true;
	}

	function handlePointerLeave(event) {
		isHovering = false;
	}

	function handlePointerDown(event) {
		isDragging = true;
		event.nativeEvent.target.setPointerCapture?.(event.nativeEvent.pointerId);

		
		// color = 'white';
	}

	function handlePointerUp(event) {
		isDragging = false;
		event.nativeEvent.target.releasePointerCapture?.(event.nativeEvent.pointerId);
		// color = defaultColor;
	}

	function handlePointerMove(event) {
		if (isDragging) {
			// Only update the x position, keep y and z locked
			position = [$pointer.x * 1000, position[1], position[2]];
		}
	}

	let isDragging = $state(false);
	let isHovering = $state(false);
</script>

<svelte:window
	onpointerup={(e) => {
		if (isDragging) {
			isDragging = false;
		}
	}}
	onpointermove={handlePointerMove}
	onblur={(e) => {
		if (isDragging) {
			isDragging = false;
		}
	}}
/>

<T.Mesh
	position={position.map((v) => v / 1000)}
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
	onpointerdown={handlePointerDown}
	onclick={(e) => console.log('clicked')}
>
	<T.SphereGeometry args={[1 / 100]} />
	<T.MeshBasicMaterial color={activeColor} side={2} />
</T.Mesh>
