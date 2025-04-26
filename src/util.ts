export function formatDate(
  date: Date,
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"],
) {
  return date.toLocaleDateString("en-GB", { dateStyle });
}
