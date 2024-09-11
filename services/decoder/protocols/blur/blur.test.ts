import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("blur", () => {
    const server = request(app);

    describe("OrdersMatched", () => {
        test("eth-mainnet", async () => {
            const res = await server
                .post("/api/v1/tx/decode")
                .set({
                    "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY,
                })
                .send({
                    chain_name: "eth-mainnet",
                    tx_hash:
                        "0xdabd1d1ef7ac27cbdaff2aa190d07e4449c7105f826738b56d1f14ca87a3d284",
                });
            const { events } = res.body as { events: EventType[] };
            const event = events.find(({ name }) => name === "Orders Matched");
            if (!event) {
                throw Error("Event not found");
            }
            expect(event?.details?.length).toBeLessThanOrEqual(12);
            expect(event?.tokens?.length).toBeLessThanOrEqual(1);
            expect(event?.nfts?.length).toBeLessThanOrEqual(1);
        });
    });
});
