import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("covalent-network", () => {
    test("moonbeam-mainnet:BlockSpecimenProductionProofSubmitted", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                chain_name: "moonbeam-mainnet",
                tx_hash:
                    "0x62ca953422e00605ce8561a4cee863e063a892ba69b578875747c4d54f6e353e",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Block Specimen Production Proof Submitted"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(3);
    });
});

describe("covalent-network", () => {
    test("moonbeam-mainnet:Unstaked", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                chain_name: "moonbeam-mainnet",
                tx_hash:
                    "0x0f165e83c3f353ee14bb78c01f88a0620aa7b4c9de24bb69ba1653ad90fda93d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Unstaked");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(3);
        expect(event.tokens?.length).toEqual(1);
    });
});

describe("covalent-network", () => {
    test("moonbeam-mainnet:RewardRedeemed", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                chain_name: "moonbeam-mainnet",
                tx_hash:
                    "0x90a20c7f7d1bfbda38c1532131232ed056cb9ef49ccba8b28498974dd837eed1",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Reward Redeemed");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
        expect(event.tokens?.length).toEqual(1);
    });
});

describe("covalent-network", () => {
    test("moonbeam-mainnet:CommissionRewardRedeemed", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                chain_name: "moonbeam-mainnet",
                tx_hash:
                    "0x9d0d9ddc5e06aafcd8c1ab6e8b5dc0cb81d4e62a247b2d3e364bcf650ad61594",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Commission Reward Redeemed"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
        expect(event.tokens?.length).toEqual(1);
    });
});

describe("covalent-network", () => {
    test("moonbeam-mainnet:BlockSpecimenProductionProofSubmitted", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                chain_name: "moonbeam-mainnet",
                tx_hash:
                    "0x2c601a9a34f906769b241567e6c778920d14c8884740dea31a75de58c22cf663",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(
            ({ name }) => name === "Block Specimen Production Proof Submitted"
        );
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
    });
});

describe("covalent-network", () => {
    test("eth-mainnet:Staked", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({
                "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY,
            })
            .send({
                chain_name: "eth-mainnet",
                tx_hash:
                    "0xd8f4de64159857c609f6ab92a5d6914b149fcd02b49e31839c6cea5d78c1667d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Staked");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event.details?.length).toEqual(2);
        expect(event.tokens?.length).toEqual(1);
    });
});
