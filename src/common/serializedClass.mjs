
export class SerializedResponse {
    constructor(data, statusCode = 200, message = null) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;

    }
}

export class NotFoundError extends SerializedResponse {
    constructor(message) {
        super(null, 404, message);
        this.name = "NotFoundError";
    }
}