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
                    "0x8235c55ee3e43973710fbad71934c29e1b635e346e22a3923f3760d2c8d0b759",
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
                    "0x588d3ae5e31dd66788a4e9ac7f677a02c2e7b691dce014a7a6702153ef440e49",
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
                    "0x71eb6c994ba206d35e9625c0139a94e85665fb2ac7a5ac3d2c346bc9f5a9de40",
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
                    "0x9ca6a5bda1d982c871c74c6603c7c96d1559140bd69a64b692b59b2fc1a91293",
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
                    "0xfcf4097cc6b61801e5c9f3a11f16e1d7f7fa76921d182e8b0c4ff88c1a6b5b3f",
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

    test("eth-mainnet:Withdrawal Requested", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x1cdcd47924e59bab5026da93fa5f5f7dd96718fee5e9e2924a4ba39e23da3a0a",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Withdrawal Requested"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(4);
        expect(event.tokens?.length).toEqual(1);
    });

    test("eth-mainnet:Withdrawal Claimed", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xfadc5ea23b04adf5a55f4933a464ed2deb03b9cbf42257831e3e5c93203123d7",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdrawal Claimed");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(3);
        expect(event.tokens?.length).toEqual(1);
    });

    test("eth-mainnet:Batch Metadata Update", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0x54e8178be9dad3ae0a7ec4e52bdd231b86d5a0a8b76e07d76b75f0a1144388c7",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Batch Metadata Update"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
    });

    test("eth-mainnet:Withdrawals Finalized", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xaaa7a76022040bfc7d93c52db52f58d6187906c0b71bb9b0a002e8860ce9a465",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Withdrawals Finalized"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(4);
        expect(event.tokens?.length).toEqual(1);
    });
});
