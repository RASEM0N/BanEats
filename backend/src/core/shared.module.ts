import { PubSub } from 'graphql-subscriptions';
import { Global, Module } from '@nestjs/common';

// @TODO пока что сюда приземлил
// всякие утилки, надо будет куда-то в другое место перекинуть
// по файлам разнести
export enum SHARED_COMPONENTS {
	pubSub = 'pubSub',
	bearerToken = 'bearerToken',
}

export class BearerToken {
	createToken(token: string): string {
		if (!token) {
			return '';
		}

		return `Bearer ${token}`;
	}

	extractInitToken(text: string): string {
		if (typeof text !== 'string') {
			return '';
		}

		// /^Bearer (\S+)/.exec(bearerToken)?.[1]
		return /(?<=Bearer )(\S+)*(?=$)/.exec(text)?.[0];
	}
}

@Global()
@Module({
	providers: [
		{
			provide: SHARED_COMPONENTS.pubSub,
			useValue: new PubSub(),
		},
		{
			provide: SHARED_COMPONENTS.bearerToken,
			useValue: new BearerToken(),
		},
	],
	exports: [SHARED_COMPONENTS.pubSub, SHARED_COMPONENTS.bearerToken],
})
export class SharedModule {}
