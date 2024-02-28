import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("fallback", () => {
    test("Approval", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
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
            expect(event.tokens?.length).toEqual(1);
            expect(event.details?.length).toEqual(2);
        } else if (event.nfts?.length) {
            expect(event.nfts?.length).toEqual(1);
            expect(event.details?.length).toEqual(2);
        } else {
            expect(event.details?.length).toEqual(3);
        }
    });
});
