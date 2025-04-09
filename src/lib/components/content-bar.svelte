<script lang="ts">
  import { goto } from "$app/navigation";
  import Link from "$lib/components/link.svelte";
  import ThemeToggle from "$lib/components/theme-toggle.svelte";

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

{#snippet shortcut(key: string)}
  <span
    class="bg-muted/10 border-muted/25 hidden w-4 items-center justify-center rounded border text-xs sm:flex"
  >
    {key}
  </span>
{/snippet}

{#snippet list()}
  <section class="flex h-full flex-col justify-between gap-4">
    <div class="flex flex-col gap-4">
      <div class="*:hover:bg-muted/10 flex flex-col gap-2 *:flex *:justify-between *:rounded *:p-2">
        <Link href={HOME_PATH} text="Home" trigger={handleRouteChange}>
          {@render shortcut("1")}
        </Link>
        <Link href={BLOG_PATH} text="Blog" trigger={handleRouteChange}>
          {@render shortcut("2")}
        </Link>
      </div>

      <div class="flex items-center gap-2 text-xs">
        <div class="border-muted/25 flex-grow border-t"></div>
        <span class="text-muted">Social Media</span>
        <div class="border-muted/25 flex-grow border-t"></div>
      </div>

      <div class="*:hover:bg-muted/10 flex flex-col gap-2 *:flex *:justify-between *:rounded *:p-2">
        <Link href="https://github.com/brooknullsh" text="GitHub" />
        <Link href="https://x.com/brooknullsh" text="Twitter" />
        <Link href="https://instagram.com/brooknullsh" text="Instagram" />
      </div>
    </div>
    <ThemeToggle />
  </section>
{/snippet}

<nav
  class="border-muted/25 sm:dark:bg-dark-secondary dark:bg-dark sm:bg-light-secondary flex h-16
  items-center justify-between border-b bg-white p-4 sm:sticky sm:top-0 sm:left-0 sm:h-screen
  sm:min-w-72 sm:flex-col sm:items-start sm:justify-normal sm:gap-4 sm:border-r"
>
  <section class="flex items-center gap-2 p-2">
    <img class="h-8 w-8 rounded-full" src="/favicon.ico" alt="Younger me" />
    <span>
      <p>Brook Nash</p>
      <p class="text-muted text-sm">Software Engineer</p>
    </span>
  </section>

  <section class="hidden h-full w-full sm:block">
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
  <section
    class="dark:bg-dark-secondary absolute z-50 w-full bg-white/50 p-4 shadow backdrop-blur-lg"
  >
    {@render list()}
  </section>
{/if}
