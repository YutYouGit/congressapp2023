<script lang="ts">
  import { onMount } from "svelte";
  import createMap from "$lib/interactive_map";

  let el: HTMLCanvasElement,
    location: HTMLSpanElement,
    hoveringLocation: HTMLSpanElement,
    funFacts: HTMLUListElement,
    contactInfo: HTMLUListElement,
    searchBar: HTMLInputElement;

  onMount(() =>
    createMap(el, location, hoveringLocation, funFacts, contactInfo, searchBar)
  );
</script>

<input bind:this={searchBar} type="text" placeholder="Go to Municipality" />

<p class="location">Selected: <span id="location" bind:this={location} /></p>
<p class="location">
  Hovering Over: <span id="location" bind:this={hoveringLocation} />
</p>

<div class="box-left">
  <b>Fun Facts</b>
  <ul class="fun-facts" bind:this={funFacts} />
</div>

<div class="box-right">
  <b>Contact Info</b>
  <ul class="contact-info" bind:this={contactInfo} />
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
    flex-direction: column;
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
    flex-direction: column;
    position: absolute;
    max-width: 25vw;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    top: 50%;
    transform: translateY(-50%);
  }

  ul {
    font-size: clamp(0.4rem, 1vw, 1.6rem);
    list-style-position: inside;
    text-indent: 0;
    padding: 0;
    margin: 0;
    list-style: ">";
  }

  input {
    color: var(--tertiary-0);
    background-color: var(--bg-1);
    border: var(--tertiary-1) solid 6px;
    padding: 6px;
    font-size: clamp(0.8rem, 2vw, 2.3rem);
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 50%);
    text-align: center;
    box-shadow: 0px 0px 25px 1rem
      color-mix(in srgb, var(--bg-0) 25%, rgba(0, 0, 0, 0));
  }

  input:focus {
    outline: none;
  }
</style>
