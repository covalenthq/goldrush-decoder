import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("uniswap-v3", () => {
    test("eth-mainnet:PoolCreated", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "0xf87d91f3d72a8e912c020c2e316151f3557b1217b44d4f6b6bec126448318530",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "PoolCreated");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });

    test("eth-mainnet:Burn", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "0x3d1748ea19a9c6c3b7690652fca03c54f6636f1403b9df25e4965ddfa765f06c",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Burn");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });

    test("eth-mainnet:Burn", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "0x509ffb3e2e1338991b27284d6365a93bdf36ac50a9a89e6260b5f791bf0e50e6",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Burn");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });

    test("eth-mainnet:Swap", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "0xf0c18bcdeb3b167a7323499307b6a18031450bf955cf9ec1153231f97898f391",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Swap");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });

    test("eth-mainnet:Collect", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "0x7c927bbab8a2f60f0a36ee9425c03db556a44c87dddf855d5641f5f1c2270ebd",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Collect");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});
