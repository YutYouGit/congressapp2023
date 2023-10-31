<div>
  <div id="logo">
    <a data-sveltekit-reload href="/">
      <button>
        <img src="/favicon.png" alt="Home" />
      </button>
    </a>
  </div>
</div>

<style>
  div {
    position: sticky;
    top: 0;
    left: 0;
    background-color: color-mix(in srgb, var(--fg-1) 7%, var(--bg-0));
    display: flex;
    max-width: 100vw;
    max-height: 8vh;
    box-shadow: 0 0 20px 2rem
      color-mix(in srgb, var(--bg-0) 15%, rgba(0, 0, 0, 0));
  }

  a button {
    color: var(--bg-0);
    border: none;
    background-color: color-mix(in srgb, var(--secondary-0) 75%, var(--bg-0));
    padding: 15px 20px 15px 20px;
    margin-left: clamp(5px, 1.2vw, 35px);
    height: 8vh;
    max-width: 15vw;
    font-size: 115%;
  }

  a button:hover {
    background-color: color-mix(in srgb, var(--secondary-1) 85%, var(--bg-1));
  }

  #logo {
    flex: auto;
  }

  #logo button {
    margin: 0;
    padding: 0 1vw 0 1vw;
    background-color: color-mix(in srgb, var(--primary-0) 75%, var(--bg-0));
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #logo button:hover {
    background-color: color-mix(in srgb, var(--primary-1) 85%, var(--bg-1));
  }

  img {
    max-height: 7vh;
    width: auto;
    margin: 0;
  }
</style>
