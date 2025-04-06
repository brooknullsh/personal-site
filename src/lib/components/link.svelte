<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    href: string;
    text: string;
    trigger?: () => void;
    children?: Snippet;
  };

  let { href, text, trigger = () => undefined, children }: Props = $props();
</script>

{#snippet icon()}
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
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2
        6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3
        1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403
        5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22
        1.23-.15 1.85v4"
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
      fill="none"
      stroke="currentColor"
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
  {#if text === "Home"}
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
  {:else if text === "Blog"}
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
  {/if}
{/snippet}

<a {href} onclick={trigger}>
  <span class="flex items-center gap-2 text-sm">
    {@render icon()}
    {text}
  </span>
  {#if children}
    {@render children()}
  {:else}
    <span>&#8599</span>
  {/if}
</a>
