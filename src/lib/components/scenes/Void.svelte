<script>
	import { T } from '@threlte/core';
	import { Environment } from '@threlte/extras';
	import { Color } from 'three';

	let { scene } = $props();

	scene.background = new Color('#FFFFFF');
</script>

<T.AmbientLight intensity={0.5} />
<Environment isBackground={false} url={'/images/hdrs/room.hdr'} />
