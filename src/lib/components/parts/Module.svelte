<script>
	import { T } from '@threlte/core';
	import Panel from '$lib/components/parts/Panel.svelte';
	import Countertop from './Countertop.svelte';
	import Attach from './Attach.svelte';
	import GhostPlane from './GhostPlane.svelte';

	const config = $state({
		width: 200,
		height: 800,
		depth: 600
	});

	const axisAttach = $derived(getAxisAttach(config));
	// $inspect(axisAttach);

	const cornerAttach = $derived(getCornerAttach(config));

	const faces = $derived(getFaces(config));
	// $inspect(faces);

	function getAxisAttach(config) {
		return [
			{ x: config.width / 2, y: 0, z: 0 },
			{ x: -config.width / 2, y: 0, z: 0 },
			{ x: 0, y: config.height / 2, z: 0 },
			{ x: 0, y: -config.height / 2, z: 0 },
			{ x: 0, y: 0, z: config.depth / 2 },
			{ x: 0, y: 0, z: -config.depth / 2 }
		];
	}

	function getCornerAttach(config) {
		return [
			{ x: config.width / 2, y: config.height / 2, z: config.depth / 2 },
			{ x: -config.width / 2, y: config.height / 2, z: config.depth / 2 },
			{ x: config.width / 2, y: -config.height / 2, z: config.depth / 2 },
			{ x: -config.width / 2, y: -config.height / 2, z: config.depth / 2 },
			{ x: config.width / 2, y: config.height / 2, z: -config.depth / 2 },
			{ x: -config.width / 2, y: config.height / 2, z: -config.depth / 2 },
			{ x: config.width / 2, y: -config.height / 2, z: -config.depth / 2 },
			{ x: -config.width / 2, y: -config.height / 2, z: -config.depth / 2 }
		];
	}

	function getFaces(config) {
		return [
			{
				name: 'right',
				position: { x: config.width / 2, y: 0, z: 0 },
				normal: { x: 1, y: 0, z: 0 },
				rotation: [0, Math.PI / 2, 0],
				size: [config.depth, config.height]
			},
			{
				name: 'left',
				position: { x: -config.width / 2, y: 0, z: 0 },
				normal: { x: -1, y: 0, z: 0 },
				rotation: [0, Math.PI / 2, 0],
				size: [config.depth, config.height]
			},
			{
				name: 'top',
				position: { x: 0, y: config.height / 2, z: 0 },
				normal: { x: 0, y: 1, z: 0 },
				rotation: [Math.PI / 2, 0, 0],
				size: [config.width, config.depth]
			},
			{
				name: 'bottom',
				position: { x: 0, y: -config.height / 2, z: 0 },
				normal: { x: 0, y: -1, z: 0 },
				rotation: [Math.PI / 2, 0, 0],
				size: [config.width, config.depth]
			},
			{
				name: 'front',
				position: { x: 0, y: 0, z: config.depth / 2 },
				normal: { x: 0, y: 0, z: 1 },
				rotation: [0, 0, 0],
				size: [config.width, config.height]
			},
			{
				name: 'back',
				position: { x: 0, y: 0, z: -config.depth / 2 },
				normal: { x: 0, y: 0, z: -1 },
				rotation: [0, 0, 0],
				size: [config.width, config.height]
			}
		];
	}

	const origin = {
		x: config.width / 2,
		y: 0,
		z: 0
	};
</script>

<Panel width={200} length={600} position={[-290, 300, 100]} rotation={[0, 0, Math.PI / 2]} />
<Panel width={200} length={600} position={[290, 300, 100]} rotation={[0, 0, Math.PI / 2]} />
<Countertop width={210} length={610} position={[0, 600, 100]} rotation={[0, 0, 0]} />
<T.Group position={[0, config.height / 2 / 1000, 0]}>
	<!-- {#each axisAttach as attach}
		<Attach position={[attach.x, attach.y, attach.z]} color={'red'} />
	{/each}

	{#each cornerAttach as attach}
		<Attach position={[attach.x, attach.y, attach.z]} color={'green'} />
	{/each}

	{#each faces as face}
		<GhostPlane position={face.position} size={face.size} rotation={face.rotation} color={'teal'} />
	{/each} -->
</T.Group>
