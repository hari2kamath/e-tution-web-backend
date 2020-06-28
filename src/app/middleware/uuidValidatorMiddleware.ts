import { Validator } from "class-validator";
import * as express from "express";
import ValidationException from "../exception/ValidationException";

/**
 * Middleware to be used to validate uuid as path variables
 * @param fields fieldNames to be validated as uuid in path
 */
export function pathUUIDValidatorMiddleware(fields: string[]): express.RequestHandler {
    return (req, res, next) => {
        const requestValidator = new Validator();
        for (const field of fields) {
            if (!requestValidator.isUUID(req.params[`${field}`])) {
                throw new ValidationException(
                    [
                        {
                            property: field,
                            constraints: { [field]: `Invalid uuid supplied for ${field}` },
                            children: []
                        }
                    ]);
            }
        }
        next();
    };
}
