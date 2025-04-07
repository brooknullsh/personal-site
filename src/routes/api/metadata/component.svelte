<script lang="ts">
  let { title = "Hello, world!", subtitle = "See more at brooknullsh.com" } = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center bg-white">
  <h1 class="text-6xl font-bold">{title}</h1>
  <p class="text-neutral-500">{subtitle}</p>
  <img class="h-12 w-12 rounded-full" src="https://brooknullsh.com/favicon.ico" alt="Younger me" />
</div>
