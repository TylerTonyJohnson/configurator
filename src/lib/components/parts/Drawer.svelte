<script>
	import { T } from '@threlte/core';
	import Panel from '$lib/components/parts/Panel.svelte';
	import Countertop from './Countertop.svelte';
</script>

<Panel width={200} length={600} position={[0, 0, 0]}/>
<Panel width={200} length={600} position={[100, 100, 100]}/>
<Countertop width={210} length={610} position={[0, 19, 0]}/>
