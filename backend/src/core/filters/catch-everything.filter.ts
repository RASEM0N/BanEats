import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { UberEastsError } from '@ubereats/common/error';

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
		if (exception instanceof UberEastsError) {
			return {
				errorCode: exception.errorCode,
				message: exception.message,
			};
		}

		return {
			errorCode: this._getErrorCode(exception),
			message: exception.message,
		};
	}

	private _getErrorCode(exception: Error): number {
		return exception instanceof HttpException ? exception.getStatus() ?? 500 : 400;
	}
}
