import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("uniswap-v2", () => {
    test("eth-mainnet:Swap", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x7c0d75a2c4407917a0f70c48655f8a66f35f9aba7d36e615bcabc2c191ac2658",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Swap");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(2);
    });

    test("eth-mainnet:Mint", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x020468ae7052596fdd72deac82891de9bdd581f4bb12631c729d1825ad7ba2b6",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Mint");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(2);
    });
});
