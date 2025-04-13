<script lang="ts">
  import ClipboardCheckedIcon from "$lib/assets/clipboard-checked-icon.svg?raw";
  import ClipboardIcon from "$lib/assets/clipboard-icon.svg?raw";

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
    <button class="*:stroke-muted rounded text-sm" aria-label="Copy" onclick={handleClick}>
      {#if hasCopied}
        <!-- eslint-disable-next-line -->
        {@html ClipboardCheckedIcon}
      {:else}
        <!-- eslint-disable-next-line -->
        {@html ClipboardIcon}
      {/if}
    </button>
  </span>
</div>
