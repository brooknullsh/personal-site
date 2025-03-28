<script lang="ts">
  import { goto } from "$app/navigation";
  import Shortcut from "$lib/components/shortcut.svelte";
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Content, Description, Footer, Header, Root, Title } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { formatDate, sortBlogs, type BlogMetadata } from "$lib/utils";
  import type { LayoutData } from "./$types";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";

  let { data }: { data: LayoutData } = $props();

  let searchInput = $state<HTMLInputElement | null>(null);
  let viewButtons = $state<Record<string, HTMLAnchorElement | null>>({
    "0": null,
    "1": null,
    "2": null,
  });

  function blogSearch(searchValue: string, { title, tags }: BlogMetadata) {
    title = title.toLowerCase();
    return title.includes(searchValue) || tags.some((tag) => tag.includes(searchValue));
  }

  function setBlogData(searchValue: string) {
    searchValue = searchValue.toLowerCase().trim();
    const blogs = data.allMetadata.filter((metadata) => blogSearch(searchValue, metadata));

    if (blogs.length) {
      data.allMetadata = sortBlogs(blogs);
    } else toast.error("Error", { description: "Try another query" });
  }

  function handleSearchInput({ currentTarget }: Event) {
    const searchValue = (currentTarget as HTMLInputElement).value;
    const url = searchValue ? `?search=${searchValue}` : "/";

    goto(url, { keepFocus: true });
    setBlogData(searchValue);
  }

  function handleKeyUp({ key }: KeyboardEvent) {
    viewButtons[key]?.click();

    if (key === "s") {
      return searchInput?.focus();
    } else if (key === "Escape" && document.activeElement === searchInput) {
      return searchInput?.blur();
    }
  }

  onMount(() => {
    const params = new URL(window.location.href).searchParams;
    const searchValue = params.get("search");
    if (!searchValue || !searchInput) return;

    searchInput.value = searchValue;
    setBlogData(searchValue);
  });
</script>

<svelte:head>
  <title>Home | brooknullsh</title>
</svelte:head>

<svelte:window onkeyup={handleKeyUp} />

<TitleBar title="Home" subtitle="Hello, world!">
  <Input
    class="w-full sm:w-72"
    bind:ref={searchInput}
    oninput={handleSearchInput}
    placeholder="Search..."
  />
  <Shortcut key="s" />
</TitleBar>

<section class="container flex flex-col gap-8 py-4">
  <h1 class="text-4xl font-bold truncate">Blogs</h1>

  <div class="flex flex-wrap gap-4 justify-center">
    {#each data.allMetadata as { slug, title, description, published, tags }, index}
      <Root class="flex h-62 w-96 flex-col justify-between bg-card/10 backdrop-blur-xs">
        <Header>
          <div class="flex justify-between">
            <Title class="truncate font-medium" {title}>{title}</Title>
            {#if index < 3}
              <Shortcut key={index.toString()} />
            {/if}
          </div>
          <Description>{formatDate(published, "full")}</Description>
        </Header>
        <Content>{description}</Content>
        <Footer class="flex justify-between">
          <div class="flex gap-2">
            {#each tags.slice(0, 2) as tag}
              <Badge>{tag}</Badge>
            {/each}
          </div>
          <div class="flex items-center gap-2">
            <Button
              class="text-xl"
              bind:ref={viewButtons[index.toString()]}
              variant="secondary"
              href={`/blog/${slug}`}
            >
              &rsaquo;
            </Button>
          </div>
        </Footer>
      </Root>
    {/each}
  </div>
</section>
