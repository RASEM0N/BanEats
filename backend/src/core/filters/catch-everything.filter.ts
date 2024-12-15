import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { CustomError } from '@ubereats/common/error';

export class CatchEverythingFilter extends BaseExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		httpAdapter.reply(
			ctx.getResponse(),
			this._getErrorResult(exception),
			this._getErrorCode(exception),
		);
	}

	private _getErrorResult(exception: Error): { errorCode: number; message: string } {
		if (exception instanceof CustomError) {
			return {
				errorCode: exception.errorCode,
				message: exception.description,
			};
		}

		return {
			errorCode: this._getErrorCode(exception),
			message: exception.message,
		};
	}

	private _getErrorCode(exception: Error): number {
		return exception instanceof HttpException ? exception.getStatus() : 400;
	}
}
