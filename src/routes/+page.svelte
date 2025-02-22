<script lang="ts">
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Root, Header, Title, Description, Footer } from "$lib/components/ui/card";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const viewButtons = $state<Record<string, HTMLAnchorElement | null>>({
    "0": null,
    "1": null,
    "2": null,
  });

  const handleKeyUp = ({ key }: KeyboardEvent) => viewButtons[key]?.click();
</script>

<svelte:head>
  <title>Home | brooknullsh</title>
</svelte:head>

<svelte:window onkeyup={handleKeyUp} />

<TitleBar title="Home" subtitle="Hello, world!" />

<section class="container flex flex-wrap gap-4">
  {#each data.allMetadata as { slug, title, description }, index}
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
  {/each}
</section>
