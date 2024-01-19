import { type Chain } from "@covalenthq/client-sdk";
import { prompt } from "enquirer";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { format, type Options } from "prettier";
import prettierConfig from "../.prettierrc.json";
import { slugify } from "../utils/functions";
import { type Config } from "../services/decoder/decoder.types";
import * as yup from "yup";

const writeInFile = async (
    path: string,
    name: string,
    content: string,
    pretty: boolean
) => {
    if (!existsSync(path)) {
        mkdirSync(path);
    }
    const formattedContent = pretty
        ? await format(content, {
              parser: "typescript",
              ...(prettierConfig as Options),
          })
        : content;
    writeFileSync(join(path, name), formattedContent, "utf-8");
};

const reset = "\x1b[0m";
const bright = "\x1b[1m";
const fgGreen = "\x1b[32m";
const fgYellow = "\x1b[33m";
const customLog = (message: string, type: "success" | "info") => {
    console.info(
        `${bright}${type === "info" ? fgYellow : fgGreen}${message}${reset}`
    );
};

const nameSchema = yup.string().trim().required("name is required");
const addressSchema = yup.string().trim().required("address is required");
const isFactorySchema = yup.boolean().required("is_factory is required");
const networkSchema = yup.string().trim().required("network is required");
(async () => {
    const { protocol_name } = (await prompt({
        type: "input",
        name: "protocol_name",
        message: "What is the Protocol Name?",
        format: (value) => slugify(value),
        result: (value) => slugify(value),
        validate: async (value) => {
            try {
                await nameSchema.validate(value, {
                    abortEarly: false,
                });
                return true;
            } catch (error: yup.ValidationError | any) {
                return `Invalid Input: ${error.errors.join(". ")}`;
            }
        },
    })) as {
        protocol_name: string;
    };

    const protocolDir: string = join(
        __dirname,
        "..",
        "services",
        "decoder",
        "protocols",
        protocol_name
    );

    const exists: boolean = existsSync(protocolDir);
    if (exists) {
        customLog(
            `'${protocol_name}' already exists. Adding another config to it.`,
            "info"
        );
    } else {
        customLog(
            `'${protocol_name}' does not exist. Creating a new config template.`,
            "info"
        );
    }

    const { address, is_factory, network } = (await prompt([
        {
            type: "input",
            name: "address",
            message: "What is the Contract Address?",
            format: (value) => value.toLowerCase(),
            result: (value) => value.toLowerCase(),
            validate: async (value) => {
                try {
                    await addressSchema.validate(value, {
                        abortEarly: false,
                    });
                    return true;
                } catch (error: yup.ValidationError | any) {
                    return `Invalid Input: ${error.errors.join(". ")}`;
                }
            },
        },
        {
            type: "toggle",
            name: "is_factory",
            message: "Is it a Factory Address?",
            enabled: "Yes",
            disabled: "No",
            validate: async (value) => {
                try {
                    await isFactorySchema.validate(value, {
                        abortEarly: false,
                    });
                    return true;
                } catch (error: yup.ValidationError | any) {
                    return `Invalid Input: ${error.errors.join(". ")}`;
                }
            },
        },
        {
            type: "input",
            name: "network",
            message: "What is the Network or the Chain for this contract?",
            format: (value) => slugify(value),
            result: (value) => slugify(value),
            validate: async (value) => {
                try {
                    await networkSchema.validate(value, {
                        abortEarly: false,
                    });
                    return true;
                } catch (error: yup.ValidationError | any) {
                    return `Invalid Input: ${error.errors.join(". ")}`;
                }
            },
        },
    ])) as {
        address: string;
        is_factory: boolean;
        network: Chain;
    };

    if (!exists) {
        const eventName: string = "<EVENT NAME>";
        const abiContent: string = `[]`;
        const configsContent: string = `import{type Config}from"../../decoder.types";\n\nconst configs:Config[]=[{protocol_name:"${protocol_name}",address:"${address}",is_factory:${is_factory},network:"${network}"}];\n\nexport default configs;`;
        const decodersContent: string = `import{Decoder}from"../../decoder";import{type EventType}from"../../decoder.types";import{DECODED_ACTION,DECODED_EVENT_CATEGORY}from"../../decoder.constants";import{decodeEventLog,type Abi}from"viem";import ABI from "./abis/${protocol_name}.abi.json";\n\nDecoder.on("${protocol_name}:${eventName}",["${network}"],ABI as Abi,async(log,chain_name,covalent_client):Promise<EventType> =>{const{raw_log_data,raw_log_topics}=log;\n\nconst{args:decoded}=decodeEventLog({abi:ABI,topics:raw_log_topics as[],data:raw_log_data as \`0x\${string}\`,eventName:"${eventName}"})as{eventName:"${eventName}";args:{}};\n\nreturn{action:DECODED_ACTION.SWAPPED,category:DECODED_EVENT_CATEGORY.DEX,name:"${eventName}",protocol:{logo:log.sender_logo_url as string,name:log.sender_name as string}};});`;
        const testContent: string = `import request from"supertest";import app from"../../../..";import{type EventType}from"../../decoder.types";\n\ndescribe("${protocol_name}",()=>{test("${network}:${eventName}",async()=>{const res=await request(app).post("/api/v1/tx/decode").set({"x-covalent-api-key":process.env.TEST_COVALENT_API_KEY}).send({network:"${network}",tx_hash:"<ENTER TX HASH FOR TESTING>"});const{events}=res.body as{events:EventType[]};const event=events.find(({name})=>name==="${eventName}");if(!event){throw Error("Event not found")}const testAdded:boolean=false;expect(testAdded).toEqual(true)})});`;
        await writeInFile(
            protocolDir,
            `${protocol_name}.decoders.ts`,
            decodersContent,
            true
        );
        await writeInFile(
            protocolDir,
            `${protocol_name}.configs.ts`,
            configsContent,
            true
        );
        await writeInFile(
            protocolDir,
            `${protocol_name}.test.ts`,
            testContent,
            true
        );
        await writeInFile(
            join(protocolDir, "abis"),
            `${protocol_name}.abi.json`,
            abiContent,
            false
        );
        customLog(`Created '${protocol_name}' successfully!`, "success");
    } else {
        const configFile = join(protocolDir, `${protocol_name}.configs.ts`);
        const configs = require(configFile).default as Config[];
        configs.push({
            address: address,
            is_factory: is_factory,
            protocol_name: protocol_name,
            network: network,
        });
        const configsContent: string = `import{type Config}from"../../decoder.types";\n\nconst configs:Config[]=${JSON.stringify(
            configs
        )};\n\nexport default configs;`;
        await writeInFile(
            protocolDir,
            `${protocol_name}.configs.ts`,
            configsContent,
            true
        );
        customLog(
            `Added a config to '${protocol_name}' successfully!`,
            "success"
        );
    }
})();
