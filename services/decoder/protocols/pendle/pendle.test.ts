import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("pendle", () => {
    test("eth-mainnet:SwapPtAndToken", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x3a6536890e00ed665eb39c36aa3073c4211de39cfc8c751ceaaf352c40a56fb0",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "SwapPtAndToken");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.tokens) {
            expect(event.tokens?.length).toEqual(4);
        }
        expect(event?.details?.length).toEqual(3);
    });
});

describe("pendle", () => {
    test("eth-mainnet:SwapYtAndSy", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x1fa6bd1d4718b540eb1b2dd80edcca9710262ad9960eadb2743c354f1f4aa4aa",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "SwapYtAndSy");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.tokens) {
            expect(event.tokens?.length).toEqual(2);
        }
        expect(event?.details?.length).toEqual(3);
    });
});

describe("pendle", () => {
    test("eth-mainnet:SwapYtAndToken", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x52f579402c1dc41b626a2c71755283266e267cfb4b747e2f7195dd6bde0726fc",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "SwapYtAndToken");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.tokens) {
            expect(event.tokens?.length).toEqual(4);
        }
        expect(event?.details?.length).toEqual(3);
    });
});

describe("pendle", () => {
    test("eth-mainnet:NewLockPosition", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x4056e54c6f6cc1788830be72eacc13edfdd1f2af7c67715b429c50a9d94176e6",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "NewLockPosition");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.tokens) {
            expect(event.tokens?.length).toEqual(1);
        }
        expect(event?.details?.length).toEqual(2);
    });
});

describe("pendle", () => {
    test("eth-mainnet:BroadcastUserPosition", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x4056e54c6f6cc1788830be72eacc13edfdd1f2af7c67715b429c50a9d94176e6",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "BroadcastUserPosition"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.details?.length).toEqual(2);
    });
});

describe("pendle", () => {
    test("eth-mainnet:BroadcastTotalSupply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x4056e54c6f6cc1788830be72eacc13edfdd1f2af7c67715b429c50a9d94176e6",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "BroadcastTotalSupply"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.details?.length).toEqual(3);
    });
});
