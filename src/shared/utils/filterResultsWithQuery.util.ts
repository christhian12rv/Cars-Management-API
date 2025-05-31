// Generic filter function for all atributes contained on filter parameter.

import { normalizeText } from './normalizeText.util';

// For each atribute of filter, its value is compared to same atribute on every object of items array
export function filterResultsWithQuery<T extends object>(
  items: T[],
  filters: object,
): T[] {
  return Object.entries(filters).reduce((result, [key, value]) => {
    if (!value) return result;

    return result.filter((item) => {
      const itemValue = item[key as keyof T];

      if (typeof itemValue === 'string' && typeof value === 'string') {
        return normalizeText(itemValue.toLowerCase()).includes(
          normalizeText(value.toLowerCase()),
        );
      }

      if (typeof itemValue === 'number' && typeof value === 'number') {
        return itemValue === value;
      }

      if (itemValue instanceof Date && value instanceof Date) {
        return itemValue.getTime() === value.getTime();
      }

      return false;
    });
  }, items);
}
