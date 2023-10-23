<script lang="ts">
  import { onMount } from "svelte";
  import createMap from "$lib/interactive_map";

  let el: HTMLCanvasElement;
  let location: HTMLSpanElement;
  let hoveringLocation: HTMLSpanElement;
  let funFacts: HTMLOListElement;
  let contactInfo: HTMLOListElement;

  onMount(() => {
    createMap(el, location, hoveringLocation, funFacts, contactInfo);
  });
</script>

<p class="location">Location: <span id="location" bind:this={location} /></p>
<p class="location">
  Hovering: <span id="location" bind:this={hoveringLocation} />
</p>

<div class="box-left">
  <ol class="fun-facts" bind:this={funFacts} />
</div>

<div class="box-right">
  <ol class="contact-info" bind:this={contactInfo} />
</div>

<canvas bind:this={el}>
  Canvas is not supported by this platform. Please update your browser.
</canvas>

<style>
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div {
    padding: clamp(5px, 3vw, 30px);
  }

  .location {
    font-size: clamp(1rem, 2.5vw, 4rem);
  }

  .box-left {
    margin-left: 10px;
    left: 0%;
    background-color: var(--bg-0);
    display: flex;
    position: absolute;
    max-width: 25vw;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    top: 50%;
    transform: translateY(-50%);
  }

  .box-right {
    margin-right: 10px;
    right: 0%;
    background-color: var(--bg-0);
    display: flex;
    position: absolute;
    max-width: 25vw;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    top: 50%;
    transform: translateY(-50%);
  }

  ol {
    font-size: clamp(0.4rem, 1vw, 1.6rem);
  }
</style>
