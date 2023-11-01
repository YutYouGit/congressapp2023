<head>
  <title>DistrictCompass</title>
</head>

<script lang="ts">
  import Map from "$lib/map.svelte";
  import about from "$lib/aboutUs.svelte";
  import humanServices from "$lib/officeComponents/humanServices.svelte";
  import finances from "$lib/officeComponents/finances.svelte";
  import judicial from "$lib/officeComponents/judicial.svelte";
  import government from "$lib/officeComponents/government.svelte";
  import community from "$lib/officeComponents/community.svelte";
  import healthAndSafety from "$lib/officeComponents/healthAndSafety.svelte";

  const options = [
    { type: "Contact Info", component: null },
    { type: "Human Services", component: humanServices },
    { type: "Finances", component: finances },
    { type: "Judicial", component: judicial },
    { type: "Government", component: government },
    { type: "Community", component: community },
    { type: "Health and Safety", component: healthAndSafety },
    { type: "About Us", component: about },
  ];

  let selected = options[0];

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

<div class="box-left">
  <p class="location">
    [Current Location] <span id="location" bind:this={location}>___</span>
    <br />
    [Hovering Over] <span id="location" bind:this={hoveringLocation}>___</span>
  </p>
  <br />
  <b style="color: var(--primary-0); font-size: 160%">Fun Facts</b>
  <ul class="fun-facts" bind:this={funFacts}>
    <li>Fun facts will appear here.</li>
  </ul>
</div>

<div class="box-right">
  <select bind:value={selected}>
    {#each options as option}
      <option value={option}>{option.type}</option>
    {/each}
  </select>

  <Map bind:contact={contactInfo} display={selected.type == "Contact Info" ? "block" : "none"} />
  {#if selected.type != "Contact Info"}
    <svelte:component this={selected.component} />
  {/if}
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
    background-color: var(--tertiary-0);
  }

  div {
    padding: clamp(5px, 3vw, 30px);
  }

  .location {
    font-size: 150%;
    color: var(--secondary-0);
  }

  select {
    color: var(--primary-0);
    font-size: 160%;
    background-color: var(--bg-0);
    border: var(--secondary-0) solid 2px;
    outline: none;
  }

  select:hover {
    background-color: var(--bg-1);
  }

  #location {
    color: var(--tertiary-1);
  }

  .box-left {
    margin-left: 10px;
    left: 0%;
    background-color: var(--bg-0);
    display: flex;
    flex-direction: column;
    position: absolute;
    max-width: 25vw;
    max-height: 70vh;
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
    max-height: 70vh;
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
    list-style: "> ";
  }

  ul li {
    margin-top: 1vh;
  }

  input {
    color: var(--tertiary-0);
    background-color: var(--bg-1);
    border: var(--tertiary-1) solid 6px;
    padding: 6px;
    font-size: clamp(0.8rem, 2vw, 2.3rem);
    position: absolute;
    top: -3.25vh;
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
