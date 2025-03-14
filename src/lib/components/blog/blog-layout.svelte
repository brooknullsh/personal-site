<script lang="ts">
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { isMobile } from "$lib/stores";
  import { formatDate } from "$lib/utils";
  import { Separator } from "../ui/select";
  import "./blog.css";
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    title: string;
    description: string;
    tags: string[];
    published: string;
    lastEdited: string;
  };

  let { children, title, description, tags, published, lastEdited }: Props = $props();
  let homeButton = $state<HTMLAnchorElement | null>(null);

  published = formatDate(published);
  lastEdited = formatDate(lastEdited);

  function handleKeyUp({ key }: KeyboardEvent) {
    if (key === "h") homeButton?.click();
  }
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
      <span class="text-muted-foreground">- h -</span>
    {/if}
  </Button>
</TitleBar>

<section class="container flex flex-col gap-8 py-4" id="blog-content">
  <p class="text-muted-foreground text-center italic">{description}</p>
  <div class="flex flex-wrap items-center justify-center gap-2">
    {#each tags as tag}
      <Badge variant="secondary">{tag}</Badge>
    {/each}
  </div>
  <Separator />
  {@render children()}
  <p class="text-muted-foreground text-center">{lastEdited}</p>
</section>
