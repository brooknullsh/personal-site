<script lang="ts">
  import "./blog.css";

  import type { Snippet } from "svelte";
  import TitleBar from "../title-bar.svelte";
  import { Button } from "../ui/button";

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

<TitleBar {title} subtitle={published}>
  <Button class="text-2xl" href="/" variant="outline">🏡</Button>
</TitleBar>

<section class="container flex flex-col gap-4" id="blog-content">
  <p class="text-muted-foreground">{description}</p>
  {@render children()}
</section>
