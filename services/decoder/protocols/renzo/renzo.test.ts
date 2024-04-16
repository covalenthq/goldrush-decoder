import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("renzo", () => {
    test("eth-mainnet:<EVENT NAME>", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "<ENTER TX HASH FOR TESTING>",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "<EVENT NAME>");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});
