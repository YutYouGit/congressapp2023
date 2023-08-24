<script lang="ts">
    import { onMount } from "svelte";
    import createMap from "$lib/interactive_map";

    let el: HTMLCanvasElement;

    onMount(() => {
        createMap(el);
    });
</script>

<canvas bind:this={el} />

<style>
    canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
