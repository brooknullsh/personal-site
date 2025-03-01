<script lang="ts">
  import { onMount } from "svelte";

  type Props = { linkUrl: string; title: string; description?: string };
  let { linkUrl, title, description }: Props = $props();

  let imageUrl = $state("");

  onMount(async () => {
    const res = await fetch(`/get-metadata?target=${linkUrl}`);
    const { imageUrl: url } = await res.json();
    imageUrl = url;
  });
</script>

<a
  class="hover:border-primary flex h-36 w-full items-center rounded border !no-underline"
  href={linkUrl}
>
  <img
    class="h-full w-full overflow-hidden rounded-l object-cover sm:w-1/2"
    src={imageUrl || "/favicon.jpeg"}
    alt={title}
  />

  <div class="flex h-full w-full flex-col gap-2 p-4">
    <h2 class="text-primary text-end">
      {title} <span class="text-muted-foreground">&#8599;</span>
    </h2>
    <hr />
    <p class="text-muted-foreground text-xs sm:text-sm">
      {description}
    </p>
  </div>
</a>
