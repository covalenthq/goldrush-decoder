import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("fallback", () => {
    test("ApprovalForAll", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
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
        expect(event.details?.length).toEqual(3);
    });
});
