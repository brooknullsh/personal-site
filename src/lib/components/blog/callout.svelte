<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
    type: "info" | "warn" | "alert";
  };

  let { children, type }: Props = $props();
  const colour = type === "info" ? "blue" : type === "warn" ? "yellow" : "red";

  const typeContainerStyle = () => `border-${colour}-500 bg-${colour}-500/10`;
  const typeTextStyle = () => `text-${colour}-500`;
</script>

<div class={`flex w-full gap-2 rounded border-l-4 p-4 ${typeContainerStyle()}`}>
  <span class="flex items-center">{type === "info" ? "🙋‍♂️" : type === "warn" ? "⚠️" : "🚨"}</span>
  <p class={typeTextStyle()}>{@render children()}</p>
</div>
