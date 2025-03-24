<script lang="ts">
  import FooterBar from "$lib/components/footer-bar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import "../app.css";

  let { children } = $props();
</script>

<Toaster theme="dark" />

<div class="sticky top-0 left-0 dark:opacity-5 opacity-10 -z-50">
  <svg class="absolute h-screen w-screen">
    <defs>
      <pattern
        id=":S2:"
        width="128"
        height="128"
        patternUnits="userSpaceOnUse"
        x="100%"
        y="100%"
        patternTransform="translate(112 64)"
      >
        <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#:S2:)"></rect>
  </svg>
</div>

<main class="flex min-h-[95vh] flex-col">
  {@render children()}
</main>

<FooterBar />
