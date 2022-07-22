<script>
	import Slider from './src/Slider.svelte';
	// import Slider from '@bulatdashiev/svelte-slider';
	
	let value = [10, 100];
</script>

<div class="get-started">
	value: {value[0]}
	<Slider bind:value />
</div>