export const isNullAddress = (address: string): boolean => {
    return (
        address === "0x0000000000000000000000000000000000000000" ||
        address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
};
