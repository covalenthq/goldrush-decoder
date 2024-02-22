import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("lido", () => {
    test("eth-mainnet:TransferShares", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xe9c8e3d7629f0305d75f6bd3171cde37baa8f4d38b1c1f1bb5e158420e4bb144",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Transfer Shares");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(3);
    });
});
