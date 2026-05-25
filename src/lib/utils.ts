export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  });
}

export function sortByDate<T extends { data: { date: Date } }>(entries: T[]): T[] {
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
