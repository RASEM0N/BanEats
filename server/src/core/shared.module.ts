import { PubSub } from 'graphql-subscriptions';
import { Global, Module } from '@nestjs/common';

// @TODO переименовать надо
// и думаю заменить на другую библу

const pubSub = new PubSub();

export enum SHARED_COMPONENTS {
	pubSub = 'pubSub',
}

@Global()
@Module({
	// я бы этот модуль лучше бы вдругой вынес
	// в WS
	providers: [
		{
			provide: SHARED_COMPONENTS.pubSub,
			useValue: pubSub,
		},
	],
	exports: [SHARED_COMPONENTS.pubSub],
})
export class SharedModule {}
