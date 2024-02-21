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
});
