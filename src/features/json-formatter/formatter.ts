export const formatJson = (value: string): string => JSON.stringify(JSON.parse(value), null, 2);

export const minifyJson = (value: string): string => JSON.stringify(JSON.parse(value));

