import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("dfk", () => {
    test("defi-kingdoms-mainnet:Pet Fed", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "defi-kingdoms-mainnet",
                tx_hash:
                    "0x038746ca8d77f7df46d669da7108fb618afc927cbcb64615846e91286e2327a8",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Pet Fed");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.details?.length).toEqual(4);
    });
});
