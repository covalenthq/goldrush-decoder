import app from "../../../api";
import { type EventType } from "../decoder.types";
import request from "supertest";

describe("Native", () => {
    const server = request(app);

    test("Native Transfer", async () => {
        const res = await server
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xfa6d5bd3041f6d904e96e592d5d339907637d1c445b8464184dba92d728e7234",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Native Transfer");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toBeLessThanOrEqual(2);
        expect(event.tokens?.length).toBeLessThanOrEqual(1);
    });
});
