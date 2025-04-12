<script lang="ts">
  // The library I use for the Markdown rendering does not offer <pre> component overriding out of
  // the box. This component is used instead directly in the Markdown and the "-mb-{value}" styling
  // used negates the value set in our root "+layout.svelte" to squash it close to the <pre> element.
  //
  // https://github.com/pngwn/MDsveX/issues/496

  let { path }: { path: string } = $props();

  let headerElement = $state<HTMLDivElement | null>(null);
  let hasCopied = $state(false);

  function getCodeContent() {
    if (!headerElement) return "";

    const preElement = headerElement.nextElementSibling;
    if (!preElement) return "";

    const { firstElementChild: codeElement } = preElement;
    return codeElement ? codeElement.textContent : "";
  }

  async function handleClick() {
    const code = getCodeContent();

    if (!code) return;
    await navigator.clipboard.writeText(code);

    hasCopied = true;
    setTimeout(() => {
      hasCopied = false;
    }, 2000);
  }
</script>

<div
  class="bg-muted/20 dark:bg-muted/10 border-muted/15 -mb-6 flex h-10 items-center justify-between rounded-t border border-b-0 p-2"
  bind:this={headerElement}
>
  <span class="flex w-1/3 items-center gap-2 *:size-3 *:rounded-full">
    <span class="bg-rose-400"></span>
    <span class="bg-yellow-400"></span>
    <span class="bg-emerald-400"> </span>
  </span>
  <p class="text-muted w-1/3 text-center text-sm font-medium">{path}</p>
  <span class="flex w-1/3 justify-end">
    <button
      class="*:stroke-muted rounded text-sm hover:*:stroke-black"
      aria-label="Copy"
      onclick={handleClick}
    >
      {#if hasCopied}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      {:else}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
      {/if}
    </button>
  </span>
</div>
