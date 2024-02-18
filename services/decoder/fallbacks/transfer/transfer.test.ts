import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("fallback", () => {
    test("Transfer", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0xe7b894fdac8c037fa69bbabe168fe7984033226e1b1871bd9f70c861b6f6a35d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Transfer");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
        if (event.tokens) {
            expect(event.tokens?.length).toEqual(1);
        }
        if (event.nfts) {
            expect(event.nfts?.length).toEqual(1);
        }
    });
});
