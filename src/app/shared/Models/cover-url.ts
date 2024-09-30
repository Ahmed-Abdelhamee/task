export function getSpecificUrl(key: string, value: string, size: 'S' | 'M' | 'L'): string {
  const baseUrl = 'https://covers.openlibrary.org';
  return `${baseUrl}/${key}/${value}-S.jpg`;
}