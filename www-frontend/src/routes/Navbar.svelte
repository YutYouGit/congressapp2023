<div>
  <a id="logo" href="/"><button>Home</button></a>
  <a href="/map"><button>Interactive Map</button></a>
  <a href="/about"><button>About</button></a>
</div>

<style>
  div {
    position: sticky;
    top: 0;
    left: 0;
    background-color: color-mix(in srgb, var(--fg-1) 10%, var(--bg-0));
    display: flex;
    max-width: 100vw;
    box-shadow: 0 0 20px 2rem
      color-mix(in srgb, var(--bg-0) 15%, rgba(0, 0, 0, 0));
  }

  a button {
    color: var(--bg-0);
    border: none;
    background-color: color-mix(in srgb, var(--secondary-0) 75%, var(--bg-0));
    padding: 20px;
    margin-left: 20px;
  }

  a button:hover {
    background-color: color-mix(in srgb, var(--secondary-1) 85%, var(--bg-1));
  }

  #logo {
    flex: auto;
  }

  #logo button {
      margin: 0;
    background-color: color-mix(in srgb, var(--primary-0) 75%, var(--bg-0));
  }

  #logo button:hover {
    background-color: color-mix(in srgb, var(--primary-1) 85%, var(--bg-1));
  }
</style>
