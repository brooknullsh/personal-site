<script lang="ts">
  import "./blog.css";

  import type { Snippet } from "svelte";
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Button } from "$lib/components/ui/button";

  type Props = {
    children: Snippet;
    title: string;
    description: string;
    published: string;
  };

  let { children, title, description, published }: Props = $props();
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
</svelte:head>

<svelte:window onkeyup={handleKeyUp} />

<TitleBar {title} subtitle={published}>
  <Button bind:ref={homeButton} href="/" variant="outline">
    🏡<span class="text-muted-foreground">[h]</span>
  </Button>
</TitleBar>

<section class="container flex flex-col gap-8" id="blog-content">
  <p class="text-muted-foreground">{description}</p>
  {@render children()}
</section>
