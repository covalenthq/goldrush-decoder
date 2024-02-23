import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("lido", () => {
    test("eth-mainnet:Transfer Shares", async () => {
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

    test("eth-mainnet:Submitted", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x7b820fc2409217a65ad6b7a4a06eeb412470b94821c07f7ddd4b75c8cbc172c4",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Submitted");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(3);
        expect(event.tokens?.length).toEqual(1);
    });

    test("eth-mainnet:Token Rebased", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x406f1e0feb4259f667ef0ae2270933b2249fe8bd35f1eec36b8f15e987ee6e32",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Token Rebased");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(5);
        expect(event.tokens?.length).toEqual(2);
    });

    test("eth-mainnet:Shares Burnt", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x406f1e0feb4259f667ef0ae2270933b2249fe8bd35f1eec36b8f15e987ee6e32",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Shares Burnt");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
        expect(event.tokens?.length).toEqual(2);
    });

    test("eth-mainnet:ETH Distributed", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x406f1e0feb4259f667ef0ae2270933b2249fe8bd35f1eec36b8f15e987ee6e32",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "ETH Distributed");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(1);
        expect(event.tokens?.length).toEqual(5);
    });

    test("eth-mainnet:Withdrawals Received", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x406f1e0feb4259f667ef0ae2270933b2249fe8bd35f1eec36b8f15e987ee6e32",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Withdrawals Received"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(1);
    });

    test("eth-mainnet:EL Rewards Received", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x406f1e0feb4259f667ef0ae2270933b2249fe8bd35f1eec36b8f15e987ee6e32",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "EL Rewards Received");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.tokens?.length).toEqual(1);
    });

    test("eth-mainnet:CL Validators Updated", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x406f1e0feb4259f667ef0ae2270933b2249fe8bd35f1eec36b8f15e987ee6e32",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "CL Validators Updated"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
    });
});
