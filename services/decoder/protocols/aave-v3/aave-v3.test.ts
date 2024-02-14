import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("aave-v3", () => {
    test("eth-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0xa8e62ea54a8f17433c0645836486d8a8d98abb12442135f01dce6f3172715431",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("eth-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0xf1e4f35e193f2662ea18069dfb4bc4254abdfb7a2a505a3edbda79270a9203d3",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("eth-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x484a1a8d495e5542d78151a8127b5e17d14acd2d4ce8afb1963e13d00ff31cfa",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });
    test("eth-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x282139da884d8e9ada3d3483c97bd3e9d374b1cdf0c3f0743ef01aea51bde100",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });
    test("eth-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0xa3d772345d3c8cb19bf91f9aca52257a00eaf115f2c7df2de0fd179420717aeb",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "FlashLoan");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });
    test("eth-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x6719d800b14f376406810aacbc19e49a243df2287f2001ccd9354b3d4ff33ac9",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "LiquidationCall");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });
});
