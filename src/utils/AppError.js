class AppError extends Error {
    constructor(message, statusCode, data = null, errorCode = null) {
        super(message);

        this.statusCode = statusCode;
        this.data = data;
        this.errorCode = errorCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;