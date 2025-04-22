<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { data }: LayoutProps = $props();
</script>

<h1 class="text-3xl font-medium sm:w-3/4">Blogs</h1>

<div class="grid grid-cols-[min-content_auto]">
  <h2 class="text-muted pr-6 text-lg">Published</h2>
  <h2 class="text-muted text-lg">Title</h2>

  {#each data.blogs as { metadata, slug }}
    {@const { title, published } = metadata}

    <a
      class="*:border-muted/25 hover:*:bg-muted/10 contents *:flex *:h-12
      *:items-center *:overflow-x-auto *:border-t *:whitespace-nowrap"
      href={`/blog/${slug}`}
    >
      <p class="pr-6 text-sm font-semibold">{published}</p>
      <p>{title}</p>
    </a>
  {/each}
</div>
