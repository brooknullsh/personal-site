<script lang="ts">
  import type { Snippet } from "svelte";
  import TitleBar from "./title-bar.svelte";

  type Props = {
    children: Snippet;
    title: string;
    description: string;
    published: string;
  };

  let { children, title, description, published }: Props = $props();

  published = new Date(published).toLocaleDateString(undefined, { dateStyle: "full" });
</script>

<svelte:head>
  <title>{title} | brooknullsh</title>
</svelte:head>

<TitleBar {title} subtitle={published} />

<p class="text-muted-foreground">{description}</p>

{@render children()}
