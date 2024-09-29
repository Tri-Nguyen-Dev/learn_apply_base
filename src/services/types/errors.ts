export interface ApiErrorResponse {
    message: string;
}

export class ApiError extends Error {
    constructor(public message: string, public type: ApiErrorType, public statusCode: number) {
        super(message);
        this.type = type;
        this.statusCode = statusCode;
    }
}

export enum ApiErrorType {
    BadRequest,
    Unauthorized,
    Forbidden,
    NotFound,
    ServerError,
    Unknown
}
