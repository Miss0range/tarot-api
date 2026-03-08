const ErrorType = Object.freeze({
    //Tarot related error code
    RESOURCE_NOT_FOUND: { code: "RESOURCE_NOT_FOUND", status: 404 },
    SIZE_EXCEEDED: { code: "SIZE_EXCEEDED", status: 400 },
    INVALID_INPUT: { code: "INVALID_INPUT", status: 400 },

    //User register
    USERNAME_IN_USE: { code: "USERNAME_IN_USE", status: 409 },
    EMAIL_IN_USE: { code: "EMAIL_IN_USE", status: 409 },

    //Authorization and Authentication related
    UNAUTHORIZED: { code: "UNAUTHORIZED", status: 401 },
    FORBIDDEN: { code: "FORBIDDEN", status: 403 },

    //GENERAL
    VALIDATION_ERROR: { code: "VALIDATION_ERROR", status: 400 },
    INTERNAL_ERROR: { code: "INTERNAL_ERROR", status: 500 },

    //TOKEN
    INVALID_TOKEN: { code: "INVALID_TOKEN", status: 401 },
});

class AppError extends Error {
    constructor(message, type = ErrorType.INTERNAL_ERROR, source = "") {
        super(message);
        this.type = type;
        this.source = source;
    }
}

module.exports = { AppError, ErrorType };
