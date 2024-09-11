import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("paraswap-v5", () => {
    const server = request(app);

    describe("SwappedV3", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x7b0e0718e211149bdd480fe372e0cfec2e8c3c2737ace1dc969674843e313258",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(({ name }) => name === "Swap V3");
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(4);
            expect(event.tokens?.length).toBeLessThanOrEqual(2);
        });

        test("matic-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "matic-mainnet",
                    tx_hash:
                        "0xbd0f211af42276a79dca5a5bd5a9b27c95eaa8403083171fa2a129c35a74996f",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(({ name }) => name === "Swap V3");
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(4);
            expect(event.tokens?.length).toBeLessThanOrEqual(2);
        });

        test("avalanche-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "avalanche-mainnet",
                    tx_hash:
                        "0x41525d4a5790d110ec0816397cafeab5d777e8a8c21f07b06a800d5c567d2804",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(({ name }) => name === "Swap V3");
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(4);
            expect(event.tokens?.length).toBeLessThanOrEqual(2);
        });
    });
});
