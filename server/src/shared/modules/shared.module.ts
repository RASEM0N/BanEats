import { PubSub } from 'graphql-subscriptions';
import { Global, Module } from '@nestjs/common';

const pubSub = new PubSub();

export enum SHARED_COMPONENTS {
	pubSub = 'pubSub',
}

@Global()
@Module({
	providers: [
		{
			provide: SHARED_COMPONENTS.pubSub,
			useValue: pubSub,
		},
	],
	exports: [SHARED_COMPONENTS.pubSub],
})
export class SharedModule {}
