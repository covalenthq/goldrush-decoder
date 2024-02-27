import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("fallback", () => {
    test("Transfer", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xa16a05cb1d0d37e75e52fa15e4d69307272ae922e098a5023017729ce95c358c",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Transfer");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
        expect(event.tokens?.length).toEqual(1);
    });
});
