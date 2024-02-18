import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("source-zorb", () => {
    test("zora-mainnet:Transfer", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                chain_name: "zora-mainnet",
                tx_hash:
                    "0x14219bb78009c81a7192799ba5fe172e8c3e2dd4635cdf0d173af942f0c33a4f",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Transfer");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.nfts?.length).toEqual(1);
    });
});
