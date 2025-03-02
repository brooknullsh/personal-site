<script lang="ts">
  import "./blog.css";

  import type { Snippet } from "svelte";
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "../ui/badge";
  import { isMobile } from "$lib/stores";

  type Props = {
    children: Snippet;
    title: string;
    description: string;
    tags: string[];
    published: string;
  };

  let { children, title, description, tags, published }: Props = $props();
  let homeButton = $state<HTMLAnchorElement | null>(null);

  published = new Date(published).toLocaleDateString(undefined, { dateStyle: "full" });

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    if (key === "h") homeButton?.click();
  };
</script>

<svelte:head>
  <title>{title} | brooknullsh</title>
  <meta name="description" content={description} />
  <meta name="author" content="Brook Nash" />
  <meta name="keywords" content={tags.join(",")} />
</svelte:head>

<svelte:window onkeyup={handleKeyUp} />

<TitleBar {title} subtitle={published}>
  <Button bind:ref={homeButton} href="/" variant="outline">
    🏡
    {#if !$isMobile}
      <span class="text-muted-foreground">[h]</span>
    {/if}
  </Button>
</TitleBar>

<section class="container flex flex-col gap-8" id="blog-content">
  <p class="text-muted-foreground text-center">{description}</p>

  <div class="flex flex-wrap items-center justify-center gap-2">
    {#each tags as tag}
      <Badge>{tag}</Badge>
    {/each}
  </div>

  {@render children()}
</section>
