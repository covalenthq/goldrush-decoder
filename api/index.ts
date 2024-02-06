import express, {
    type Express,
    type Request,
    type Response,
    type NextFunction,
} from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import { GoldRushDecoder } from "../services";
import { txRouter } from "../microservices/tx/tx.routes";
import { TimestampParser } from "../utils/functions";

dotenvConfig();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/healthcheck", (_req: Request, res: Response) => {
    const now = new Date();
    res.json({
        success: true,
        timestamp: now.toISOString(),
        // time: TimestampParser(now, "descriptive"),
        uptime: process.uptime(),
    });
});
app.use("/api/v1/tx", txRouter);
app.use("*", (_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
    });
});
app.use(
    (err: Error | any, _req: Request, res: Response, _next: NextFunction) => {
        const now = new Date();
        console.error("Server Error");
        console.error(
            `${now.toISOString()}: ${TimestampParser(now, "descriptive")}`
        );
        console.error(err);
        if (err.errorCode) {
            res.status(err.errorCode).json({
                success: false,
                message: `${err.name || "Server Error"}: ${err.message}`,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
);

(async () => {
    try {
        await Promise.all([GoldRushDecoder.initDecoder()]);
        const env: string = process.env.NODE_ENV || "development";
        if (env !== "test") {
            const port: number = +(process.env.PORT || 8080);
            app.listen(port, () => {
                console.info(
                    `Server listening on Port ${port} in the ${env} environment`
                );
            });
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

process.on("SIGINT", () => {
    process.exit(0);
});
process.on("SIGHUP", () => {
    process.exit(0);
});

export default app;
