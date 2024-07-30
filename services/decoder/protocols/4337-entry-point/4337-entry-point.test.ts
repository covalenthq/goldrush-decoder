import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("4337-entry-point", () => {
    test("matic-mainnet:UserOperationEvent", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "matic-mainnet",
                tx_hash:
                    "0x8070ea41ed0dcb4f52a6033c0357b2700d689412a2f32effed839df240f37175",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "User Operation Event"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(5);
    });

    test("avalanche-mainnet:UserOperationEvent", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "avalanche-mainnet",
                tx_hash:
                    "0xc244be4710c3ad34e120c596555ce75c40356c3d9de9b141a8d5ce0ed056e0d2",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "User Operation Event"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(5);
    });
});
