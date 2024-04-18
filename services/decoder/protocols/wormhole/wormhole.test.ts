import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("wormhole", () => {
    test("eth-mainnet:LogMessagePublished", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "0x126f334fc80dc36189b2b1ef6c0fce2fcca4b16b287cf5ce8a7394a3c6710ba3",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "LogMessagePublished");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});

describe("wormhole", () => {
    test("eth-mainnet:TransferRedeemed", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "0x3fbb9deb7b0e93bc0d474dbbea82371199430f560439851cdf5a64034344ef2c",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "TransferRedeemed");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});