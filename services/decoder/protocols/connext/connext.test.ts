import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("connext", () => {
    const server = request(app);

    describe("RouterLiquidityAdded", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0xe22220e29611e9c78d0e778cb2acd473e7d7fb073778dd868e2c368598ebc579",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "RouterLiquidityAdded"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(5);
        });
    });

    describe("TransferRelayerFeesIncreased", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x3ac23b56813b3268e1a55fc06d815178b572a3d7ee20ab06aab18e8fa7d0d56a",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "TransferRelayerFeesIncreased"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(3);
            expect(event.tokens?.length).toBeLessThanOrEqual(1);
        });
    });

    describe("XCalled", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x3ac23b56813b3268e1a55fc06d815178b572a3d7ee20ab06aab18e8fa7d0d56a",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(({ name }) => name === "XCalled");
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(17);
            expect(event.tokens?.length).toBeLessThanOrEqual(2);
        });
    });

    describe("ExternalCalldataExecuted", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0xf56c61fc2e3b8ee038b5bd8d32baa88fd0e1539ee9c7dce919651bcfe11e1c43",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "ExternalCalldataExecuted"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(3);
        });
    });

    describe("SlippageUpdated", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x24eacc95b4c3610dcac9ca766aedc807605afba77d5ceee69258ccb16438d5a4",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(({ name }) => name === "SlippageUpdated");
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(2);
        });
    });

    describe("RouterLiquidityRemoved", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x1d47976272cf1317118ec241160c9efc576a41cb6c9f651dbdb23e7160526a0a",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "RouterLiquidityRemoved"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(6);
        });
    });

    describe("RouterRecipientSet", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x91c3161728f270969a5aaffe33046d357826c6f067a00004b5eb579a4d4e9183",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "RouterRecipientSet"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(3);
        });
    });

    describe("RouterOwnerAccepted", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x91c3161728f270969a5aaffe33046d357826c6f067a00004b5eb579a4d4e9183",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "RouterOwnerAccepted"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(3);
        });
    });

    describe("RouterInitialized", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0x91c3161728f270969a5aaffe33046d357826c6f067a00004b5eb579a4d4e9183",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(
                ({ name }) => name === "RouterInitialized"
            );
            if (!event) {
                throw Error("Event not found");
            }
            expect(event.details?.length).toBeLessThanOrEqual(1);
        });
    });
});
