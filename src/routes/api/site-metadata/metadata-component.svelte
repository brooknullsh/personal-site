<script lang="ts">
  let { title = "Hello, world!", subtitle = "See more at brooknullsh.com" } = $props();
</script>

<div class="flex flex-col h-full w-full bg-neutral-800 justify-center items-center text-center">
  <h1 class="font-bold text-neutral-400 text-6xl">{title}</h1>
  <p class="text-sm text-neutral-400">{subtitle}</p>
</div>
