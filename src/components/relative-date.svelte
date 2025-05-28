<script lang="ts">
  let props: { date: Date } = $props();

  const diffInSeconds = Math.round((props.date.getTime() - Date.now()) / 1000);

  const levels = [
    60, // 1 minute
    3600, // 1 hour
    86400, // 1 day
    86400 * 7, // 1 week
    86400 * 30, // 1 month
    86400 * 365, // 1 year
    Infinity,
  ];
  const keys: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  const closest = levels.findIndex((level) => level > Math.abs(diffInSeconds));
  const level = closest ? levels[closest - 1] : 1;

  const rtf = new Intl.RelativeTimeFormat("en");
  const formattedDate = rtf.format(
    Math.ceil(diffInSeconds / level),
    keys[closest],
  );
</script>

<span>{formattedDate}</span>
