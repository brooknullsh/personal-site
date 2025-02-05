<script lang="ts">
  import { Button } from "./ui/button";

  let { title, published } = $props();
</script>

<section class="flex w-full items-center justify-between">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold">{title}</h1>
    <p class="text-xs text-muted-foreground">🗓️ {published}</p>
  </div>

  <Button class="text-2xl" href="/" variant="ghost">🏡</Button>
</section>
