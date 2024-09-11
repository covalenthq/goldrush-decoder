import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("renzo", () => {
    const server = request(app);

    describe("ShareWithdrawalQueued", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x398cc4c5dd16f5e6fda2a14186c85692ea94de99c200df3665841be1bf9f2af4",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "ShareWithdrawalQueued"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event?.details?.length).toBeLessThanOrEqual(4);
        });
    });

    describe("WithdrawalQueued", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x398cc4c5dd16f5e6fda2a14186c85692ea94de99c200df3665841be1bf9f2af4",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "WithdrawalQueued"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event?.details?.length).toBeLessThanOrEqual(5);
        });
    });

    describe("WithdrawalCompleted", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0xf9842f803f7373eed7b0ad96bf91ea80e85c82074cc2855ccb0ba3d2d778bda7",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "WithdrawalCompleted"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event?.details?.length).toBeLessThanOrEqual(4);
        });
    });

    describe("Deposit", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0xdfe1f29b8dfbdd3c6a0d8379e118225f936a4ea74c1e468048d1adbc18510cb0",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(({ name }) => name === "Deposit");
            if (!event) {
                throw Error("Event not found");
            }
            expect(event?.details?.length).toBeLessThanOrEqual(3);
            expect(event.tokens?.length).toBeLessThanOrEqual(2);
        });
    });
});
