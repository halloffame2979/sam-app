export class SerializedResponse {
  constructor(data, statusCode = 200, message = null) {
    if (data && data instanceof Error) {
      SerializedResponse.fromError(data);
    } else {
      this.data = data;
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  static fromError(error) {
    if (error.statusCode == 401 || error.status == 401)
      return new UnAuthorizedError(error.message);
    if (error.statusCode == 404 || error.status == 404)
      return new NotFoundError(error.message);
  }
}

export class UnAuthorizedError extends SerializedResponse {
  constructor(message) {
    super(null, 401, message);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends SerializedResponse {
  constructor(message) {
    super(null, 404, message);
    this.name = "NotFoundError";
  }
}
