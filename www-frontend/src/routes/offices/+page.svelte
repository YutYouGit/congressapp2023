<script lang="ts">
  import humanServices from "$lib/officeComponents/humanServices.svelte";
	import finances from "$lib/officeComponents/finances.svelte";
	import judicial from "$lib/officeComponents/judicial.svelte";
  import government from "$lib/officeComponents/government.svelte";
	import community from "$lib/officeComponents/community.svelte";
	import healthAndSafety from "$lib/officeComponents/healthAndSafety.svelte";


	const options = [
		{ type: "Human Services", component: humanServices },
		{ type: "Finances", component: finances },
		{ type: "Judicial", component: judicial },
    { type: "Government", component: government },
    { type: "Judicial", component: community },
    { type: "Health ", component: healthAndSafety }
	];

	let selected = options[0];

</script>

<select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option.type}</option>
	{/each}
</select>

<svelte:component this={selected.component} />
