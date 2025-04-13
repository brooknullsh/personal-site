<script lang="ts">
  import GitHubIcon from "$lib/assets/github-icon.svg?raw";
  import HomeIcon from "$lib/assets/home-icon.svg?raw";
  import InstagramIcon from "$lib/assets/instagram-icon.svg?raw";
  import TwitterIcon from "$lib/assets/twitter-icon.svg?raw";
  import WritingIcon from "$lib/assets/writing-icon.svg?raw";
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
    <!-- eslint-disable-next-line -->
    {@html GitHubIcon}
  {:else if text === "Twitter"}
    <!-- eslint-disable-next-line -->
    {@html TwitterIcon}
  {:else if text === "Instagram"}
    <!-- eslint-disable-next-line -->
    {@html InstagramIcon}
  {/if}
  {#if text === "Home"}
    <!-- eslint-disable-next-line -->
    {@html HomeIcon}
  {:else if text === "Blog"}
    <!-- eslint-disable-next-line -->
    {@html WritingIcon}
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
