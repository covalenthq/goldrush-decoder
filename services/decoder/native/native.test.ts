import request from "supertest";
import app from "../../../api";
import { type EventType } from "../decoder.types";

describe("Native", () => {
    test("Native Transfer", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
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
        expect(event.details?.length).toEqual(2);
        expect(event.tokens?.length).toEqual(1);
    });
});
