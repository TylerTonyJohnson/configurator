<script>
	import { T } from '@threlte/core';
	import Block from './Block.svelte';
	import { TransformControls } from '@threlte/extras';

	let { cabinet } = $props();

	let groupRef = $state(null);

	function handleTransformChange() {
		if (groupRef) {
			if (groupRef.position.y < 0) {
				groupRef.position.y = 0;
			}

			// Update the class position from the Group's position
			cabinet.position.x = groupRef.position.x;
			cabinet.position.y = groupRef.position.y;
			cabinet.position.z = groupRef.position.z;
		}
	}
</script>

<T.Group bind:ref={groupRef}>
	{#each cabinet.blocks as block}
		<Block {block} />
	{/each}
</T.Group>
{#if groupRef}
	<TransformControls
		translationSnap={0.1}
		space="world"
		lineWidth={2}
		mode="translate"
		showZ={false}
		showY={true}
		size={0.5}
		object={groupRef}
		onobjectChange={handleTransformChange}
	/>
{/if}
