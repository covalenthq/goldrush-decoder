import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("fallback", () => {
    const server = request(app);

    test("ApprovalForAll", async () => {
        const res = await server
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xb9ccede37d9324af16b91b8c00ff6cbe0d426c6baf2ae0cf30a0bfe6b96c38ef",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Approval For All");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toBeLessThanOrEqual(3);
    });
});
