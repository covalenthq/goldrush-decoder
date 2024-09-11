import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("fallback", () => {
    const server = request(app);

    test("Transfer", async () => {
        const res = await server
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xe7b894fdac8c037fa69bbabe168fe7984033226e1b1871bd9f70c861b6f6a35d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Transfer");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toBeLessThanOrEqual(2);
        if (event.tokens) {
            expect(event.tokens?.length).toBeLessThanOrEqual(1);
        }
        if (event.nfts) {
            expect(event.nfts?.length).toBeLessThanOrEqual(1);
        }
    });
});
