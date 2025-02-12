<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = {
    children: Snippet;
    type: "info" | "warn" | "alert";
  };

  let { children, type }: Props = $props();
</script>

<div
  class={cn(
    "flex w-full gap-2 rounded border-l-4 p-4",
    type === "info" && "border-blue-500 bg-blue-500/10",
    type === "warn" && "border-yellow-500 bg-yellow-500/10",
    type === "alert" && "border-red-500 bg-red-500/10",
  )}
>
  <p
    class={cn(
      type === "info" && "text-blue-500",
      type === "warn" && "text-yellow-500",
      type === "alert" && "text-red-500",
    )}
  >
    {type === "info" ? "🙋‍♂️" : type === "warn" ? "⚠️" : "🚨"}
    {@render children()}
  </p>
</div>
