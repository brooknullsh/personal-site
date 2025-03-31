<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    type: "info" | "warn" | "alert";
  };

  let { children, type }: Props = $props();

  function containerStyle() {
    if (type === "info") return "border-blue-500/10 bg-blue-500/5";
    else if (type === "warn") return "border-yellow-500/10 bg-yellow-500/5";
    else return "border-red-500/10 bg-red-500/5";
  }

  function textStyle() {
    if (type === "info") return "text-blue-500";
    else if (type === "warn") return "text-yellow-500";
    else return "text-red-500";
  }

  function typeEmoji() {
    return type === "info" ? "🙋‍♂️" : type === "warn" ? "⚠️" : "🚨";
  }
</script>

<div class={`rounded relative border p-2 ${containerStyle()} ${textStyle()}`}>
  <span class="absolute -top-3 -right-3">
    <strong>{typeEmoji()}</strong>
  </span>
  <p>{@render children()}</p>
</div>
