export const chunkify = <T>(arr: Array<T>, size: number) => {
    const chunks: Array<Array<T>> = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};
