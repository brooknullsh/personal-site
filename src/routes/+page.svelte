<script lang="ts">
  import TitleBar from "$lib/components/title-bar.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Root, Header, Title, Description, Footer } from "$lib/components/ui/card";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Home | brooknullsh</title>
</svelte:head>

<TitleBar title="🏡 Home" subtitle="Hello, world!" />

<section class="flex flex-wrap gap-4">
  {#each data.allMetadata as { slug, title, description }}
    <Root class="flex h-64 w-96 flex-col justify-between">
      <Header>
        <Title class="truncate">{title}</Title>
        <Description>{description}</Description>
      </Header>
      <Footer class="flex justify-end">
        <Button class="w-max" href={`/blog/${slug}`}>View</Button>
      </Footer>
    </Root>
  {/each}
</section>
