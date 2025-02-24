<script lang="ts">
  import type { LayoutData } from "./$types";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Root, Header, Title, Description, Footer } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";

  let { data }: { data: LayoutData } = $props();

  let searchValue = $state("");

  const sortBlogs = (blogs: LayoutData["allMetadata"]) => {
    return blogs.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
  };

  const blogData = $derived.by(() => {
    if (!searchValue) return sortBlogs(data.allMetadata);

    const blogMatches = data.allMetadata.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue.toLowerCase().trim());
    });

    return sortBlogs(blogMatches);
  });

  let searchInput = $state<HTMLInputElement | null>(null);
  const viewButtons = $state<Record<string, HTMLAnchorElement | null>>({
    "0": null,
    "1": null,
    "2": null,
  });

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    viewButtons[key]?.click();
    if (key === "s") searchInput?.focus();
  };

  onMount(() => {
    searchValue = new URL(window.location.href).searchParams.get("search") || "";
  });

  $effect(() => {
    goto(searchValue ? `?search=${searchValue}` : "/", { keepFocus: true });
  });
</script>

<svelte:head>
  <title>Home | brooknullsh</title>
</svelte:head>

<svelte:window onkeyup={handleKeyUp} />

<TitleBar title="🏡 Home" subtitle="Hello, world!">
  <Input
    class="w-full sm:w-1/4"
    placeholder="Search [s]"
    bind:ref={searchInput}
    bind:value={searchValue}
  />
</TitleBar>

<section class="container flex flex-wrap justify-center gap-4">
  {#each blogData as { slug, title, description }, index}
    <Root class="flex h-64 w-96 flex-col justify-between">
      <Header>
        <Title class="truncate" {title}>{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Footer class="flex justify-end">
        {#if index < 3}
          <Button bind:ref={viewButtons[index.toString()]} class="w-max" href={`/blog/${slug}`}>
            View<span class="text-muted-foreground">[{index}]</span>
          </Button>
        {:else}
          <Button class="w-max" href={`/blog/${slug}`}>View</Button>
        {/if}
      </Footer>
    </Root>
  {:else}
    <p>No blogs were found :(</p>
  {/each}
</section>
