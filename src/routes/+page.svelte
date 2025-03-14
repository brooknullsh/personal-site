<script lang="ts">
  import { goto } from "$app/navigation";
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Content, Description, Footer, Header, Root, Title } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { isMobile } from "$lib/stores";
  import { formatDate, sortBlogs } from "$lib/utils";
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

  function setBlogData(searchValue: string) {
    searchValue = searchValue.toLowerCase().trim();
    const blogs = data.allMetadata.filter(({ title, tags }) => {
      title = title.toLowerCase();
      return title.includes(searchValue) || tags.includes(searchValue);
    });

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
    placeholder={`Search ${$isMobile ? "" : "- s -"}`}
  />
</TitleBar>

<section class="container flex flex-wrap justify-center gap-4 py-4">
  {#each data.allMetadata as { slug, title, description, published, tags }, index}
    <Root class="flex h-max w-96 flex-col justify-between">
      <Header>
        <Title class="truncate" {title}>{title}</Title>
        <Description>{formatDate(published)}</Description>
      </Header>
      <Content>{description}</Content>
      <Footer class="flex justify-between">
        <div class="flex gap-2">
          {#each tags.slice(0, 2) as tag}
            <Badge variant="secondary">{tag}</Badge>
          {/each}
        </div>
        <div>
          <Button bind:ref={viewButtons[index.toString()]} href={`/blog/${slug}`}>
            View
            {#if !$isMobile}
              <span class="text-muted-foreground">- {index.toString()} -</span>
            {/if}
          </Button>
        </div>
      </Footer>
    </Root>
  {/each}
</section>
