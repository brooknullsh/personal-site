<script lang="ts">
  import type { LayoutData } from "./$types";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Root, Header, Title, Description, Footer } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Badge } from "$lib/components/ui/badge";
  import { toast } from "svelte-sonner";
  import { isMobile } from "$lib/stores";

  let { data }: { data: LayoutData } = $props();

  let searchValue = $state("");
  let searchInput = $state<HTMLInputElement | null>(null);
  let viewButtons = $state<Record<string, HTMLAnchorElement | null>>({
    "0": null,
    "1": null,
    "2": null,
  });

  const handleKeyUp = ({ key }: KeyboardEvent) => {
    viewButtons[key]?.click();
    if (key === "s") searchInput?.focus();
    if (key === "Escape" && document.activeElement === searchInput) searchInput?.blur();
  };

  const sortBlogs = (blogs: LayoutData["allMetadata"]) => {
    return blogs.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
  };

  const findBySearch = ({ title, tags }: LayoutData["allMetadata"][number]) => {
    const cleanSearchValue = searchValue.toLowerCase().trim();
    return title.toLowerCase().includes(cleanSearchValue) || tags.includes(cleanSearchValue);
  };

  const blogData = $derived.by(() => {
    if (!searchValue) return sortBlogs(data.allMetadata);
    const blogMatches = data.allMetadata.filter(findBySearch);
    return sortBlogs(blogMatches);
  });

  onMount(() => {
    searchValue = new URL(window.location.href).searchParams.get("search") || "";
  });

  $effect(() => {
    goto(searchValue ? `?search=${searchValue}` : "/", { keepFocus: true });
    if (blogData.length) return;
    toast.warning("No blogs were found", { description: "Try another query" });
  });
</script>

<svelte:head>
  <title>Home | brooknullsh</title>
</svelte:head>

<svelte:window onkeyup={handleKeyUp} />

<TitleBar title="🏡 Home" subtitle="Hello, world!">
  <Input
    class="w-full sm:w-1/4"
    placeholder={`Search${$isMobile ? "" : " [s]"}`}
    bind:ref={searchInput}
    bind:value={searchValue}
  />
</TitleBar>

<section class="container flex flex-wrap justify-center gap-4">
  {#each blogData as { slug, title, description, tags }, index}
    <Root class="flex h-56 w-96 flex-col justify-between">
      <Header>
        <Title class="truncate" {title}>{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Footer class="flex justify-between">
        <div class="flex w-1/2 gap-2">
          {#each tags.slice(0, 2) as tag}
            <Badge>{tag}</Badge>
          {/each}
        </div>
        <div class="flex w-1/2 justify-end">
          {#if index < 3 && !$isMobile}
            <Button
              bind:ref={viewButtons[index.toString()]}
              class="w-max"
              variant="secondary"
              href={`/blog/${slug}`}
            >
              View<span class="text-muted-foreground">[{index}]</span>
            </Button>
          {:else}
            <Button class="w-max" variant="secondary" href={`/blog/${slug}`}>View</Button>
          {/if}
        </div>
      </Footer>
    </Root>
  {:else}
    <p>No blogs were found 😔</p>
  {/each}
</section>
