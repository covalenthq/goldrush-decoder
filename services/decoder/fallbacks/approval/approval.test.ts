import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("fallback", () => {
    const server = request(app);

    test("Approval", async () => {
        const res = await server
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xa16a05cb1d0d37e75e52fa15e4d69307272ae922e098a5023017729ce95c358c",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Approval");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.tokens?.length) {
            expect(event.tokens?.length).toBeLessThanOrEqual(1);
            expect(event.details?.length).toBeLessThanOrEqual(2);
        } else if (event.nfts?.length) {
            expect(event.nfts?.length).toBeLessThanOrEqual(1);
            expect(event.details?.length).toBeLessThanOrEqual(2);
        } else {
            expect(event.details?.length).toBeLessThanOrEqual(3);
        }
    });
});
