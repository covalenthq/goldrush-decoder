import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("renzo", () => {
    test("eth-mainnet:ShareWithdrawalQueued", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "<ENTER TX HASH FOR TESTING>",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "ShareWithdrawalQueued");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});

describe("renzo", () => {
    test("eth-mainnet:WithdrawalQueued", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "<ENTER TX HASH FOR TESTING>",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "WithdrawalQueued");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});

describe("renzo", () => {
    test("eth-mainnet:WithdrawalCompleted", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "<ENTER TX HASH FOR TESTING>",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "WithdrawalCompleted");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});

describe("renzo", () => {
    test("eth-mainnet:Deposit", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash: "<ENTER TX HASH FOR TESTING>",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Deposit");
        if (!event) {
            throw Error("Event not found");
        }
        const testAdded: boolean = false;
        expect(testAdded).toEqual(true);
    });
});
