export const slugify = (input: string): string =>
    input
        .replace(/\s+/g, "-")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
