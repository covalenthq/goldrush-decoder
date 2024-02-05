import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("opensea", () => {
    test("eth-mainnet:OrderFulfilled", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x7a038d2f5be4d196a3ff389497f8d61a639e4a32d353758b4f062cafbc5d475c",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Basic Order Fulfilled"
        );
        if (!event) {
            throw Error("Event not found");
        }
        if (event.nfts) {
            expect(event.nfts?.length).toBeGreaterThan(0);
        }
        if (event.tokens) {
            expect(event.tokens?.length).toBeGreaterThan(0);
        }
    });
});
