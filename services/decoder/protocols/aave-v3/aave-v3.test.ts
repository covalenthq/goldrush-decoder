import request from "supertest";
import app from "../../../../api";
import { type EventType } from "../../decoder.types";

describe("aave-v3", () => {
    test("eth-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0xa8e62ea54a8f17433c0645836486d8a8d98abb12442135f01dce6f3172715431",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("avalanche-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "avalanche-mainnet",
                tx_hash:
                    "0xc03e40824bf7e8cda8d9e13f1cbcc6aeec71d1c64e2c557b1744f0b1e526295e",
            });
        console.log(await res.body);
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("arbitrum-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "arbitrum-mainnet",
                tx_hash:
                    "0x34e3a4c692104338dfae7adeca973d2e0f48e4eb0157243451c9b6c6fd15f959",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("optimism-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "optimism-mainnet",
                tx_hash:
                    "0xdbb7546328c6b41877cf32cb00e8a7c1f93e361342ee7bd3c229defc346de0fc",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("matic-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0x98d0919ee47e3e76dee2253aa92dbaf14d10441c30d8fd77c1ee05d3ac72f06f",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("metis-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "metis-mainnet",
                tx_hash:
                    "0x11d93359b473cdeccc9b16f44273f51d4fa6fe44a3b523e745cc127ff7c9315d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("base-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "base-mainnet",
                tx_hash:
                    "0x4446501ca86bd2e8a827f7dabb838deb5577e43f69c5e87c619c8e1c4f96278f",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("bsc-mainnet:Borrow", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "bsc-mainnet",
                tx_hash:
                    "0xc9bcf01928ba0a392c8115f8183516f0a93f36572a55b04aa0256c6fda59318e",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Borrow");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(6);
    });

    test("eth-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0xf1e4f35e193f2662ea18069dfb4bc4254abdfb7a2a505a3edbda79270a9203d3",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("avalanche-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "avalanche-mainnet",
                tx_hash:
                    "0xe334e3c57cbd7592731962e584e6c0c10b69a551f1ff770e6952da123818d14d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("arbitrum-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "arbitrum-mainnet",
                tx_hash:
                    "0x064eb510fe68daa7b8a3a047e617a6944926805f7eade4e13efba1b723717026",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("optimism-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "optimism-mainnet",
                tx_hash:
                    "0xf4c5578a1deb1cabc4c5bb08b522307632136588eda983b89c7ca54d0dff35f5",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("matic-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0x599a7d3faad838e93eb2892668815d04574421b2cbea5e7ef158f21bf6eb07b0",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("metis-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "metis-mainnet",
                tx_hash:
                    "0x39493e014d16f7d76641cf4039fdc38832ea4c2a16666dc0f52b61ca34525a17",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("base-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "base-mainnet",
                tx_hash:
                    "0x3a096ff26cf3f712c1c7ba2eb9d3a3ba7e33f9dc906e6a6b224de9fdca83ff14",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("bsc-mainnet:Supply", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "bsc-mainnet",
                tx_hash:
                    "0x32037663e400e8499ec490e1f546335f17307c10f15d169e9a187a51adc7d593",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Supply");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("eth-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x484a1a8d495e5542d78151a8127b5e17d14acd2d4ce8afb1963e13d00ff31cfa",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("avalanche-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "avalanche-mainnet",
                tx_hash:
                    "0x9bdcb595252510c1ac97be4dda7420c3073e10b3df5e3f406da2f3f838b0f3e8",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("arbitrum-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "arbitrum-mainnet",
                tx_hash:
                    "0x16f3a2d99bdbf34c9d34557818e9d4f6ebfbe9f8bfad29c9c404caad94996a01",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("optimism-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "optimism-mainnet",
                tx_hash:
                    "0x6625597f017f2bb34c0d1d9db8b63ccdd4769bec66bab8c4d19eb376c28332df",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("matic-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0x98d023fa4651062d8ba8afcf5481dac1e3f9a8221092f0f08b84c10e6737e2cc",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("metis-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "metis-mainnet",
                tx_hash:
                    "0x48d199296804f6a0d5e98ebc2655fe93e52d16b03ea2cfff0a958558ba4efb9d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("base-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "base-mainnet",
                tx_hash:
                    "0xad8e384601ae7c6a6d2b0272078775437f39d700c55f3f53e7d2e6b3e56303ac",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("bsc-mainnet:Repay", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "bsc-mainnet",
                tx_hash:
                    "0x4cc8f3869bfc5ce7d62ada86ed7ef3bbd939cbb8b4295ee4cce2646b81a60452",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Repay");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("eth-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x282139da884d8e9ada3d3483c97bd3e9d374b1cdf0c3f0743ef01aea51bde100",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("avalanche-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "avalanche-mainnet",
                tx_hash:
                    "0x60771f63d97a672a99ab853c0455b44954a747f50241858bc41fbf5030eb1f6a",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("arbitrum-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "arbitrum-mainnet",
                tx_hash:
                    "0xf569fc87e63386618163f19733f684c0b9bf5f95d29d84ccfa64bd566c91f69b",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("optimism-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "optimism-mainnet",
                tx_hash:
                    "0x911cff71c5cc614f35df43d1f05ec98b4c08d8dd69e9a43eb5086b2b28c749fc",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("matic-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0xc07191d3d95cd987eda2ff15cef9e49005d03b1dd4440a8c08073103e77d9394",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("metis-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "metis-mainnet",
                tx_hash:
                    "0xf40614cc3f0ca0e954abd89f7fa74ca11b6451191632337b01b7bfd2df281c75",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("base-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "base-mainnet",
                tx_hash:
                    "0xd2dc15fa36a8474537881e8ce9c3870d1695857914076d525bb1fb6ece2fb99a",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("bsc-mainnet:Withdraw", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "bsc-mainnet",
                tx_hash:
                    "0x646b9e2bc1b9e402ef2ef1359515a8d5748f7d9093029595c6b83725bd4ad181",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Withdraw");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(3);
    });

    test("eth-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0xa3d772345d3c8cb19bf91f9aca52257a00eaf115f2c7df2de0fd179420717aeb",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("avalanche-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "avalanche-mainnet",
                tx_hash:
                    "0x2a9ec7fec0da73796cc25af9aa41c80ffb6aad1fb569f77a4c8cc60c40c4ba90",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("arbitrum-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "arbitrum-mainnet",
                tx_hash:
                    "0x02dceadaf75a078f2e3eb387323bf49c3aea001cfa857dc35bbd169caa904296",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("optimism-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "optimism-mainnet",
                tx_hash:
                    "0x23688c64ff921c88ef8910df256a7b1dbbc69427ee047d46088b1891e03715d7",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("matic-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0x10ca248beee8b126cec5ff38b804c74a35186deced0fafd46fec753b201d51f9",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("metis-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "metis-mainnet",
                tx_hash:
                    "0xae1a04c37c6bb5e2ede242f946b33955b4973bbbb9e13b2f2a35c4c1edfc3468",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("base-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "base-mainnet",
                tx_hash:
                    "0xe33d6a512285272f2b04aae8561dd0bf494c8c650fd53f12dd05e0ae8077ec5b",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("bsc-mainnet:FlashLoan", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "bsc-mainnet",
                tx_hash:
                    "0x8b0eeefc6b027dd5998341fac8d32a6031a02621501673025fc42f94ecbd4783",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Flash Loan");
        console.log(event);
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(4);
    });

    test("eth-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "eth-mainnet",
                tx_hash:
                    "0x6719d800b14f376406810aacbc19e49a243df2287f2001ccd9354b3d4ff33ac9",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });

    test("avalanche-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "avalanche-mainnet",
                tx_hash:
                    "0x84856a57469429854ae7a1a9d5578859c88e47583a0ccdbacc6daf220af610a7",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });

    test("arbitrum-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "arbitrum-mainnet",
                tx_hash:
                    "0xbe66b67f477072c20ef4096b4251704bd61b38bf19d7313bdbbb938ed1dc8cb8",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });

    test("optimism-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "optimism-mainnet",
                tx_hash:
                    "0x3de1064dd2f2ec8ed4e6dc02ff67039a415813952566950be1684dbdf14e0a6d",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });

    test("matic-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "matic-mainnet",
                tx_hash:
                    "0xdb6e36e2f7484f7088daf95ea151490344322698076a4d010fc3b9e696f2ee6e",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });

    test("metis-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "metis-mainnet",
                tx_hash:
                    "0x983f8e90d50d269b3e154c3d24353ee6bbf2c00d524cae5038df88f7f48eb3e5",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });

    test("base-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "base-mainnet",
                tx_hash:
                    "0xcc7c6723ec3435cb3235b53d1750759b9a4ffadcd5c22c635b1fd03a316a1e2c",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });

    test("bsc-mainnet:LiquidationCall", async () => {
        const res = await request(app)
            .post("/api/v1/tx/decode")
            .set({ "x-covalent-api-key": process.env.TEST_COVALENT_API_KEY })
            .send({
                network: "bsc-mainnet",
                tx_hash:
                    "0x8303541b6cfdad88aeba75d93642c1a3324fe5a00eaebae805d71f1292e3be20",
            });
        const { events } = res.body as { events: EventType[] };
        const event = events.find(({ name }) => name === "Liquidation Call");
        if (!event) {
            throw Error("Event not found");
        }
        console.log(event);
        expect(event?.tokens?.length).toBeGreaterThan(0);
        expect(event?.details?.length).toEqual(5);
    });
});
