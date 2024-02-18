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
                    "0x34ff300049313fde3ffb055d4fcbea1257fd8ca341c913033ccff6976eb7b231",
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
