import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("uniswap-v2", () => {
    test("eth-mainnet:Swap", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
            })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x7c0d75a2c4407917a0f70c48655f8a66f35f9aba7d36e615bcabc2c191ac2658",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Swap");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(2);
        expect(event.details?.length).toEqual(2);
    });

    test("defi-kingdoms-mainnet:Swap", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
            })
            .send({
                chain_name: "defi-kingdoms-mainnet",
                tx_hash:
                    "0x9327e7e7ba43fdb276e6b098e5ef7eb114640f14ce528f0419716d950ee9f947",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Swap");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(2);
        expect(event.details?.length).toEqual(2);
    });

    test("eth-mainnet:Mint", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
            })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x020468ae7052596fdd72deac82891de9bdd581f4bb12631c729d1825ad7ba2b6",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Mint");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(2);
        expect(event.details?.length).toEqual(1);
    });

    test("eth-mainnet:Burn", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
            })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xf419cd1a89b928cb93f38237e9b1e6743218fbb87aaac678cb1f950951b7476e",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Burn");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(2);
    });

    test("eth-mainnet:Sync", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
            })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xf419cd1a89b928cb93f38237e9b1e6743218fbb87aaac678cb1f950951b7476e",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Sync");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(2);
    });

    test("eth-mainnet:PairCreated", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
            })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x9584cdf7d99a22e18843cf26c484018bfb11ab4ce4f2d898ec69075ed8e3c8dc",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Pair Created");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(9);
    });
});
