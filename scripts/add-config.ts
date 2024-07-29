import prettierConfig from "../.prettierrc.json";
import { type Configs } from "../services/decoder/decoder.types";
import { slugify } from "../utils/functions";
import { Chains, type Chain } from "@covalenthq/client-sdk";
import { prompt } from "enquirer";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { format, type Options } from "prettier";
import * as yup from "yup";

const writeInFile = async (path: string, name: string, content: string) => {
    if (!existsSync(path)) {
        mkdirSync(path);
    }
    const formattedContent = await format(content, {
        parser: "typescript",
        ...(prettierConfig as Options),
    });
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
const chainNameSchema = yup
    .mixed()
    .oneOf(Object.values(Chains), "chain_name is incorrect")
    .required("chain_name is required");
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

    const { address, is_factory, chain_name } = (await prompt([
        {
            type: "input",
            name: "chain_name",
            message: "What is the Chain on which the contract is deployed?",
            format: (value) => slugify(value),
            result: (value) => slugify(value),
            validate: async (value) => {
                try {
                    await chainNameSchema.validate(value, {
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
    ])) as {
        address: string;
        is_factory: boolean;
        chain_name: Chain;
    };

    if (!exists) {
        const eventName: string = "<EVENT NAME>";
        const abiContent: string = `export const ABI = [] as const`;
        const configsContent: string = `import{type Configs}from"../../decoder.types";\n\nconst configs:Configs=[{address:"${address}",is_factory:${is_factory},protocol_name:"${protocol_name}",chain_name:"${chain_name}"}];\n\nexport default configs;`;
        const decodersContent: string = `import{GoldRushDecoder}from"../../decoder";import{DECODED_ACTION,DECODED_EVENT_CATEGORY}from"../../decoder.constants";import{type EventType}from"../../decoder.types";import{ABI}from"./abis/${protocol_name}.abi";import{decodeEventLog,type Abi}from"viem";\n\nGoldRushDecoder.on(":${eventName}",["${chain_name}"],ABI as Abi,async(log_event,tx,chain_name,covalent_client,options):Promise<EventType> =>{const{raw_log_data,raw_log_topics}=log_event;\n\nconst{args:decoded}=decodeEventLog({abi:ABI,topics:raw_log_topics as[],data:raw_log_data as \`0x\${string}\`,eventName:"${eventName}"})as{eventName:"${eventName}";args:{}};\n\nreturn{action:DECODED_ACTION.SWAPPED,category:DECODED_EVENT_CATEGORY.DEX,name:"${eventName}",protocol:{logo:log_event.sender_logo_url as string,name:log_event.sender_name as string},...(options.raw_logs?{raw_log:log_event}:{})};});`;
        const testContent: string = `import app from"../../../../api";import{type EventType}from"../../decoder.types";import request from"supertest";\n\ndescribe("${protocol_name}",()=>{test("${chain_name}:${eventName}",async()=>{const res=await request(app).post("/api/v1/tx/decode").set({"x-goldrush-api-key":process.env.TEST_GOLDRUSH_API_KEY}).send({chain_name:"${chain_name}",tx_hash:"<ENTER TX HASH FOR TESTING>"});const{events}=res.body as{events:EventType[]};const event=events.find(({name})=>name==="${eventName}");if(!event){throw Error("Event not found")}const testAdded:boolean=false;expect(testAdded).toEqual(true)})});`;
        await writeInFile(
            protocolDir,
            `${protocol_name}.decoders.ts`,
            decodersContent
        );
        await writeInFile(
            protocolDir,
            `${protocol_name}.configs.ts`,
            configsContent
        );
        await writeInFile(protocolDir, `${protocol_name}.test.ts`, testContent);
        await writeInFile(
            join(protocolDir, "abis"),
            `${protocol_name}.abi.ts`,
            abiContent
        );
        customLog(`Created '${protocol_name}' successfully!`, "success");
    } else {
        const configFile = join(protocolDir, `${protocol_name}.configs.ts`);
        const configs = require(configFile).default as Configs;
        configs.push({
            address: address,
            is_factory: is_factory,
            protocol_name: protocol_name,
            chain_name: chain_name,
        });
        const configsContent: string = `import{type Configs}from"../../decoder.types";\n\nconst configs:Configs=${JSON.stringify(
            configs
        )};\n\nexport default configs;`;
        await writeInFile(
            protocolDir,
            `${protocol_name}.configs.ts`,
            configsContent
        );
        customLog(
            `Added a config to '${protocol_name}' successfully!`,
            "success"
        );
    }
})();
