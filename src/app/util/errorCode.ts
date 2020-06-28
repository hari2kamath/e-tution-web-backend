/**
 * Custom error codes to be send to UI to display proper a response
 */
export const ErrorCodes: { [key: string]: CustomError } = {
    UNAUTHORIZED: {
        CODE: "UNAUTHORIZED",
        MESSAGE: "User is not allowed to perform this operation",
    },
    VALIDATION_ERROR: {
        CODE: "VALIDATION_ERROR",
        MESSAGE: "Validation failed error",
    },
    USER_WITH_ID_NOT_FOUND: {
        CODE: "USER_WITH_ID_NOT_FOUND",
        MESSAGE: "User with given id not found",
    },
    SERVICE_ERROR: {
        CODE: "SERVICE_ERROR",
        MESSAGE: "Obtained error from external service. Please check the logs."
    }
};

/**
 * Interface to describe custom errors
 */
export interface CustomError {
    CODE: string;
    MESSAGE: string;
}
