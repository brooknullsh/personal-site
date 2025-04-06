<script lang="ts">
  import { goto } from "$app/navigation";

  const HOME_PATH = "/";
  const BLOG_PATH = "/blog";

  let isMobileContentShown = $state(false);

  function handleRouteChange() {
    isMobileContentShown = false;
  }

  function handleKeyUp({ key }: KeyboardEvent) {
    if (key === "1") goto(HOME_PATH);
    else if (key === "2") goto(BLOG_PATH);
  }
</script>

<svelte:window onkeyup={handleKeyUp} />

{#snippet internalLink(href: string, text: string, key: string)}
  <a {href} onclick={handleRouteChange}>
    <span class="flex items-center gap-2 text-sm">
      {#if text === "Blog"}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 20h9"></path>
          <path
            d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5
            0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"
          ></path>
          <path d="m15 5 3 3"></path>
        </svg>
      {:else if text === "Home"}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
          <path
            d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
          ></path>
          <path d="M5 18v2"></path>
          <path d="M19 18v2"></path>
        </svg>
      {/if}
      {text}
    </span>
    <span class="bg-muted/10 border-muted/25 hidden rounded border px-1 text-sm sm:block">
      {key}
    </span>
  </a>
{/snippet}

{#snippet externalLink(href: string, text: string)}
  <a {href}>
    <span class="flex items-center gap-2 text-sm">
      {#if text === "GitHub"}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          ></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
      {:else if text === "Twitter"}
        <svg
          class="size-4"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
        </svg>
      {:else if text === "Instagram"}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
      {/if}
      {text}
    </span>
    <span>&#8599</span>
  </a>
{/snippet}

{#snippet list()}
  <div class="flex flex-col gap-4">
    <div class="*:hover:bg-muted/10 flex flex-col gap-2 *:flex *:justify-between *:p-2">
      {@render internalLink(HOME_PATH, "Home", "1")}
      {@render internalLink(BLOG_PATH, "Blog", "2")}
    </div>
    <div class="flex items-center gap-2 text-xs">
      <div class="border-muted/25 flex-grow border-t"></div>
      <span class="text-muted">Social Media</span>
      <div class="border-muted/25 flex-grow border-t"></div>
    </div>
    <div class="*:hover:bg-muted/10 flex flex-col gap-2 *:flex *:justify-between *:p-2">
      {@render externalLink("https://github.com/brooknullsh", "GitHub")}
      {@render externalLink("https://x.com/brooknullsh", "Twitter")}
      {@render externalLink("https://instagram.com/brooknullsh", "Instagram")}
    </div>
  </div>
{/snippet}

<nav
  class="border-muted/25 flex h-16 items-center justify-between border-b bg-white
  p-4 sm:sticky sm:top-0 sm:left-0 sm:h-screen sm:min-w-72 sm:flex-col sm:items-start
  sm:justify-normal sm:gap-4 sm:border-r sm:bg-gray-50"
>
  <section class="flex items-center gap-2 p-2">
    <img class="h-8 w-8 rounded-full" src="/favicon.ico" alt="Younger me" />
    <span>
      <p>Brook Nash</p>
      <p class="text-muted text-sm">Software Engineer</p>
    </span>
  </section>
  <section class="hidden w-full sm:block">
    {@render list()}
  </section>
  <button
    class="flex justify-end text-xl sm:hidden"
    onclick={() => (isMobileContentShown = !isMobileContentShown)}
  >
    &#8984
  </button>
</nav>

{#if isMobileContentShown}
  <section class="absolute w-full bg-white p-4 shadow">
    {@render list()}
  </section>
{/if}
