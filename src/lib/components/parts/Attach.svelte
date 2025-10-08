<script>
	import { T } from '@threlte/core';

	let { position, color } = $props();

    function handlePointerEnter(event) {
        color='blue';
    }

    function handlePointerLeave(event) {
        color='red';
    }

</script>

<T.Mesh
	position={position.map((v) => v / 1000)}
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
	onpointermove={(e) => console.log('moving')}
	onpointerdown={(e) => console.log('mouse down')}
	onpointerup={(e) => console.log('mouse up')}
	onclick={(e) => console.log('clicked')}
>
	<T.SphereGeometry args={[1 / 100]} />
	<T.MeshBasicMaterial {color} side={2} />
</T.Mesh>
