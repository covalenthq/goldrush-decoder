/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ObjectSchema, type ValidationError } from "yup";
import { type Request, type Response, type NextFunction } from "express";
type RequestLocations = "query" | "body" | "params" | "headers";

/**
 * Generic Request Validator
 * @param {RequestLocations} location The parameter of the req object to be validated.
 * @param {yup.ObjectSchema<any>} schema The schema against which validation is to be done.
 */
export const validateQuery = (
    location: RequestLocations,
    schema: ObjectSchema<any>
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let _location;
        switch (location) {
            case "query":
                _location = req.query;
                break;
            case "body":
                _location = req.body;
                break;
            case "params":
                _location = req.params;
                break;
            case "headers":
                _location = req.headers;
                break;
        }
        try {
            await schema.validate(_location, { abortEarly: false });
            next();
        } catch (error: Error | ValidationError | any) {
            let message: string = "";
            error.errors.forEach((e: string) => {
                message += `${e}. `;
            });
            res.status(400).json({
                name: "Validation Error",
                message: message.trim(),
            });
        }
    };
};

export default validateQuery;
