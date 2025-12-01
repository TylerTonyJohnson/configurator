<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import { interactivity } from '@threlte/extras';

	import Project from '$lib/components/primitives/Project.svelte';
	import Void from '$lib/components/scenes/Void.svelte';
	import Operatory from '$lib/components/scenes/Operatory.svelte';
	import Camera from '$lib/components/scenes/Camera.svelte';

	let { scene } = useThrelte();
	console.log(scene);

	let { project, room } = $props();

	interactivity();
</script>

<Camera />

<!-- ROOM -->
{#if room.type === 'void'}
	<Void {scene} />
{:else if room.type === 'operatory'}
	<Operatory {scene} />
{/if}

<!-- CABINETRY -->
<Project {project} />
