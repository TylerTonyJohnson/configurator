<script lang="ts">
	import { T } from '@threlte/core';
	import * as THREE from 'three';
	import { MeshStandardMaterial } from 'three';

	import { debug } from '$lib/stores/Debug.svelte';

	let { project } = $props();

	const materialSides = [
		new MeshStandardMaterial({ color: 'orange' }),
		new MeshStandardMaterial({ color: 'orange' }),
		new MeshStandardMaterial({ color: 'white' }),
		new MeshStandardMaterial({ color: 'saddlebrown' }),
		new MeshStandardMaterial({ color: 'orange' }),
		new MeshStandardMaterial({ color: 'orange' })
	];

	function handleClick(event: any) {
		if (event.intersections) {
			const faceIndex = event.intersections[0].faceIndex;
			console.log(event.intersections);
			const face = Math.floor(faceIndex / 2); // BoxGeometry has 2 triangles per face

			// const faceNames = ['right', 'left', 'top', 'bottom', 'front', 'back'];
			// console.log('Clicked face:', faceNames[face]);

			switch (face) {
				case 0:
					console.log('Right face clicked');
					project.components[0].width += 0.1;
					break;
				case 1:
					console.log('Left face clicked');
					project.components[0].width -= 0.1;
					break;
				case 2:
					console.log('Top face clicked');
					project.components[0].height += 0.1;
					break;
				case 3:
					console.log('Bottom face clicked');
					project.components[0].height -= 0.1;
					break;
				case 4:
					console.log('Front face clicked');
					project.components[0].depth += 0.1;
					break;
				case 5:
					console.log('Back face clicked');
					project.components[0].depth -= 0.1;
					break;
			}
		}
	}

	let group = $state();
	let boundingSphere = $derived(getBoundingSphere(group));
	// $inspect(boundingSphere);

	function getBoundingSphere(group) {
		if (!group) return null;
		console.log(project);

		// console.log(group);

		const box = new THREE.Box3().setFromObject(group);

		const sphere = new THREE.Sphere();
		box.getBoundingSphere(sphere);
		return sphere;
	}
</script>

<!-- Overall Project -->
<T.Group bind:ref={group} position={[0, 0, 0]}>
	>
	<!-- Each Cabinet/Module/Part -->
	{#each project.components as component}
		<T.Group>
			{#if debug.enabled}
				<!-- ORIGIN -->
				<T.Mesh>
					<T.SphereGeometry args={[0.02, 16, 16]} />
					<T.MeshBasicMaterial color="red" />
				</T.Mesh>

				<!-- ANCHORS -->
				{#each component.anchors as anchor}
					<T.Mesh position={[anchor.position.x, anchor.position.y, anchor.position.z]}>
						<T.SphereGeometry args={[0.02, 16, 16]} />
						<T.MeshBasicMaterial color="blue" />
					</T.Mesh>
				{/each}

				<!-- OUTLINE -->
				<T.Mesh position={[0, component.height / 2, component.depth / 2]}>
					<T.BoxGeometry args={[component.width, component.height, component.depth]} />
					<T.MeshBasicMaterial wireframe={true} color="red" />
				</T.Mesh>
				<T.Mesh position={[0, component.height / 2, component.depth / 2]} onclick={handleClick}>
					<T.BoxGeometry args={[component.width, component.height, component.depth]} />
					<T.MeshBasicMaterial color="lime" transparent opacity={0.5} />
				</T.Mesh>
			{/if}

			<!-- PANELS -->
			{#each component.panels as panel}
				<T.Mesh
					position={[panel.position.x, panel.position.y, panel.position.z]}
					rotation={[panel.rotation.x, panel.rotation.y, panel.rotation.z]}
					material={materialSides}
				>
					<T.BoxGeometry args={[panel.width, panel.depth, panel.height]} />
				</T.Mesh>
			{/each}
		</T.Group>
	{/each}

	<!-- BOUNDING SPHERE -->
	{#if debug.enabled && boundingSphere}
		<T.Mesh position={[boundingSphere.center.x, boundingSphere.center.y, boundingSphere.center.z]}>
			<T.SphereGeometry args={[boundingSphere.radius, 16, 16]} />
			<T.MeshBasicMaterial wireframe={true} color="chocolate" />
		</T.Mesh>
	{/if}
</T.Group>
