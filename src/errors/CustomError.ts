class CustomError extends Error {
  message: string;
  statusCode: number;
  code: string;

  constructor({
    name,
    message,
    statusCode,
    code,
  }: {
    name: string;
    message: string;
    statusCode: number;
    code: string;
  }) {
    super();
    this.name = name || 'Custom Error';
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default CustomError;
