import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("grindery-one", () => {
    test("matic-mainnet:Transfer", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0x8070ea41ed0dcb4f52a6033c0357b2700d689412a2f32effed839df240f37175",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Transfer");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(3);
    });
});
