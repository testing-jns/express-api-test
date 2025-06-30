import CustomError from './CustomError';

export default class UnsupportedContentTypeError extends CustomError {
  constructor(message: string) {
    super({
      name: 'Unsupported Content Type',
      message,
      statusCode: 415,
      code: 'ERR_UNSUPPORTED_CONTENT_TYPE',
    });
  }
}
