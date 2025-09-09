<script>
	import favicon from '$lib/assets/favicon.svg';

	import '../style.css/';
	import '@picocss/pico/css/pico.slate.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}