<script lang="ts">
  import { Separator } from "$lib/components//ui/select";
  import Shortcut from "$lib/components/shortcut.svelte";
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { formatDate } from "$lib/utils";
  import House from "lucide-svelte/icons/house";
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

  published = formatDate(published, "short");
  lastEdited = formatDate(lastEdited, "full");

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

<TitleBar title={published} subtitle={`Edited: ${lastEdited}`}>
  <Button bind:ref={homeButton} href="/" variant="outline">
    <House />
    <Shortcut key="h" />
  </Button>
</TitleBar>

<section
  class="container bg-background/10 backdrop-blur-xs flex flex-col gap-8 py-4"
  id="blog-content"
>
  <h2 class="text-center !font-light !text-6xl">{title}</h2>
  <p class="text-muted-foreground text-center italic">{description}</p>
  <div class="flex flex-wrap items-center justify-center gap-2">
    {#each tags as tag}
      <Badge>{tag}</Badge>
    {/each}
  </div>
  <Separator />
  {@render children()}
</section>
