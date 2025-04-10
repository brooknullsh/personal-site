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
  <meta
    name="description"
    content={blog ? blog.metadata.subtitle : "See all the blogs I have on offer."}
  />

  {#if blog}
    {@const { title, subtitle } = blog.metadata}
    {@const host = "https://brooknullsh.com"}
    <meta property="og:description" content={subtitle} />
    <meta property="og:title" content={title} />
    <meta property="og:url" content={host} />
    <meta name="twitter:card" property="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:alt" property="twitter:title" content={title} />
    <meta name="twitter:title" property="twitter:title" content={title} />
    <meta name="twitter:description" property="twitter:description" content={subtitle} />
    <meta
      property="og:image"
      content={`${host}/api/metadata?title=${title}&subtitle=${subtitle}`}
    />
    <meta
      name="twitter:image"
      property="twitter:image"
      content={`${host}/api/metadata?title=${title}&subtitle=${subtitle}`}
    />
  {/if}
</svelte:head>

{#if blog}
  {@const { title, subtitle, published } = blog.metadata}

  <article class="flex flex-col gap-6" id="blog-content">
    <h1 class="text-3xl font-medium sm:w-3/4">{title}</h1>
    <span>
      <p class="text-muted font-medium">{published}</p>
      <p class="text-muted">{subtitle}</p>
    </span>

    {@render children()}
  </article>
{:else}
  {@render children()}
{/if}
