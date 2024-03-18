import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("blur", () => {
    test("eth-mainnet:OrdersMatched", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xb7664c23d72d66ae56d7c51fee4b04968d33af513e1c2d52f1b6fc583374d0cb",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Orders Matched");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.details?.length).toEqual(12);
        expect(event?.tokens?.length).toEqual(1);
        expect(event?.nfts?.length).toEqual(1);
    });
});
