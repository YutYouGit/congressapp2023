<script lang="ts">
  import { onMount } from "svelte";
  import createMap from "$lib/interactive_map";

  let el: HTMLCanvasElement;
  let location: HTMLSpanElement;
  let hoveringLocation: HTMLSpanElement;

  onMount(() => {
    createMap(el, location, hoveringLocation);
  });
</script>

<div>
  <p class="location">Location: <span id="location" bind:this={location} /></p>
  <p class="location">
    Hovering: <span id="location" bind:this={hoveringLocation} />
  </p>
</div>

<canvas bind:this={el}>
  Canvas is not supported by this platform. Please update your browser.
</canvas>

<style>
  canvas {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div {
    padding: clamp(5px, 3vw, 30px);
  }

  .location {
    font-size: clamp(1rem, 2.5vw, 4rem);
  }
</style>
