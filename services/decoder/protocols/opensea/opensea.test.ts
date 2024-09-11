import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("opensea", () => {
    const server = request(app);

    describe("OrderFulfilled", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x7a038d2f5be4d196a3ff389497f8d61a639e4a32d353758b4f062cafbc5d475c",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "Basic Order Fulfilled"
            );
            if (!event) {
                throw Error("Event not found");
            }
            if (event.nfts) {
                expect(event.nfts?.length).toBeGreaterThan(0);
            }
            if (event.tokens) {
                expect(event.tokens?.length).toBeGreaterThan(0);
            }
            expect(event.details?.length).toBeLessThanOrEqual(3);
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
                        "0xbb0849b132f97174bd1f0c41ef39b4105ddb0e07b8f6730910d56d48dfffa0e8",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "Basic Order Fulfilled"
            );
            if (!event) {
                throw Error("Event not found");
            }
            if (event.nfts) {
                expect(event.nfts?.length).toBeGreaterThan(0);
            }
            if (event.tokens) {
                expect(event.tokens?.length).toBeGreaterThan(0);
            }
            expect(event.details?.length).toBeLessThanOrEqual(3);
        });
    });
});
