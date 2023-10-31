<script lang="ts">
  export let contact: HTMLUListElement;
  export let display: "none" | "block";
</script>

<ul class="contact-info" bind:this={contact} style={"display: " + display}>
  <li>Contact infos will appear here.</li>
</ul>

<style>
  ul {
    font-size: clamp(0.4rem, 1vw, 1.6rem);
    list-style-position: inside;
    text-indent: 0;
    padding: 0;
    margin: 0;
    list-style: "> ";
  }

  ul li {
    margin-top: 1vw;
  }
</style>
