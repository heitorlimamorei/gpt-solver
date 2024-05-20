// dataTransformer.ts

type EntryValue = {
  name: string;
  value: number;
};

type Entry = {
  name: string;
  value: EntryValue[];
};

type TransformedEntry = {
  [key: string]: string | number;
  name: string;
};

export function formatLineChartData(data: Entry[]): TransformedEntry[] {
  return data.map((entry) => {
    const transformedEntry: TransformedEntry = { name: entry.name };

    if (Array.isArray(entry.value)) {
      entry.value.forEach((subEntry) => {
        if (typeof subEntry.name === 'string' && typeof subEntry.value === 'number') {
          const key = subEntry.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          transformedEntry[key] = subEntry.value;
        }
      });
    }

    return transformedEntry;
  });
}
