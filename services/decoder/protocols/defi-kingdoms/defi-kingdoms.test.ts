import app from "../../../../api";
import { type EventType } from "../../decoder.types";
import request from "supertest";

describe("defi-kingdoms", () => {
    test("defi-kingdoms-mainnet:Pet Fed", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
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
        if (event.nfts) {
            expect(event.nfts?.length).toBeGreaterThan(0);
        }
        expect(event?.details?.length).toEqual(3);
    });

    test("defi-kingdoms-mainnet:Auction Created", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "defi-kingdoms-mainnet",
                tx_hash:
                    "0xa716c7e699fb26703b74c5cdae4a1d4930ef31353594185a9e7b40d881c56a57",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Auction Created");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.nfts) {
            expect(event.nfts?.length).toBeGreaterThan(0);
        }
        if (event.tokens) {
            expect(event.tokens?.length).toBeGreaterThan(0);
        }
        expect(event?.details?.length).toEqual(5);
    });

    test("defi-kingdoms-mainnet:Auction Cancelled", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "defi-kingdoms-mainnet",
                tx_hash:
                    "0x8a162e78fa5da11670555233052b31366c9784e78e18d849fe1edac06ad46c2c",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Auction Cancelled");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.nfts) {
            expect(event.nfts?.length).toBeGreaterThan(0);
        }
        expect(event?.details?.length).toEqual(2);
    });

    test("defi-kingdoms-mainnet:Auction Successful", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-goldrush-api-key": process.env.TEST_GOLDRUSH_API_KEY })
            .send({
                chain_name: "defi-kingdoms-mainnet",
                tx_hash:
                    "0xe313388c1d1f6e190abc93c30c48698d671da83ca0898646e3573a0c90d892db",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Auction Successful");
        if (!event) {
            throw Error("Event not found");
        }
        if (event.nfts) {
            expect(event.nfts?.length).toBeGreaterThan(0);
        }
        if (event.tokens) {
            expect(event.tokens?.length).toBeGreaterThan(0);
        }
        expect(event?.details?.length).toEqual(3);
    });
});
