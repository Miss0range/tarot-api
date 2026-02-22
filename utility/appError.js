
const ErrorType = Object.freeze({
    //Tarot related error code
    RESOURCE_NOT_FOUND: {code: "RESOURCE_NOT_FOUND", status: 404},
    SIZE_EXCEEDED: {code: "SIZE_EXCEEDED", status: 400},
    INVALID_INPUT: {code: "INVALID_INPUT", status: 400},

    //Authorization and Authentication related
    UNAUTHORIZED: { code: "UNAUTHORIZED", status: 401 },
    FORBIDDEN: {code: "FORBIDDEN", status: 403},

    //GENERAL
    VALIDATION_ERROR: {code: "VALIDATION_ERROR", status: 400},
    INTERNAL_ERROR: {code: "INTERNAL_ERROR", status:500}
});


class AppError extends Error {
    constructor(message, type = ErrorType.INTERNAL_ERROR){
        super(message);
        this.type = type;
    }
}

module.exports = {AppError, ErrorType};