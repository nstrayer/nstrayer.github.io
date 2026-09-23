export function formatPostDate(date: Date, month: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat('en-US', {
    month,
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
