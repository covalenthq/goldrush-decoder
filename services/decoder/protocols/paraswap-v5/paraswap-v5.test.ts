import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("paraswap-v5", () => {
    test("eth-mainnet:SwappedV3", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x7b0e0718e211149bdd480fe372e0cfec2e8c3c2737ace1dc969674843e313258",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Swap V3");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(4);
        expect(event.tokens?.length).toEqual(2);
    });

    test("matic-mainnet:SwappedV3", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0xbd0f211af42276a79dca5a5bd5a9b27c95eaa8403083171fa2a129c35a74996f",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Swap V3");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(4);
        expect(event.tokens?.length).toEqual(2);
    });
});
