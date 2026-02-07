export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" :
    "th";

  return `${month} ${day}${suffix}, ${year}`;
}
