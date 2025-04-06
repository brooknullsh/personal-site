<script lang="ts">
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();

  let blogSlug = $derived.by(() => {
    const { pathname } = page.url;
    return pathname.split("/").at(2);
  });

  // At "/blog", "blogSlug" is undefined and we show the "+page.svelte" content
  let blog = $derived(data.blogs.find(({ slug }) => slug === blogSlug));
</script>

<svelte:head>
  <title>{blog ? blog.metadata.title : "Blog"} | Brook Nash</title>
  <meta name="author" content="Brook Nash" />
</svelte:head>

{#if blog}
  {@const { title, published } = blog.metadata}
  <article class="flex flex-col gap-6" id="blog-content">
    <h1 class="text-3xl font-medium sm:w-3/4">{title}</h1>
    <p class="text-muted">{published}</p>
    {@render children()}
  </article>
{:else}
  {@render children()}
{/if}
