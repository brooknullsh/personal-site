<script lang="ts">
  import { Button } from "./ui/button";
  import { page } from "$app/state";

  type Props = {
    title: string;
    subtitle: string;
  };

  let { title, subtitle }: Props = $props();
</script>

<section class="sticky top-0 flex w-full items-center justify-between">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">{title}</h1>
    <p class="text-xs text-muted-foreground">{subtitle}</p>
  </div>

  {#if page.url.pathname !== "/"}
    <Button class="text-2xl" href="/" variant="ghost">🏡</Button>
  {/if}
</section>

<hr />
