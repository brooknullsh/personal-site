<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { data }: LayoutProps = $props();
</script>

<h1 class="text-3xl font-medium sm:w-3/4">Blogs</h1>
<div class="text-muted grid grid-cols-2">
  <span>Published</span>
  <span>Title</span>
</div>
<ul>
  {#each data.blogs as { metadata, slug }}
    {@const { title, published } = metadata}
    <li class="hover:bg-muted/5 border-muted/25 grid h-12 grid-cols-2 border-t">
      <a class="col-span-2 grid h-full grid-cols-2 items-center" href={`/blog/${slug}`}>
        <span class="text-muted">{published}</span>
        <span>{title}</span>
      </a>
    </li>
  {/each}
</ul>
