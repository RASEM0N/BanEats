import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(morgan('dev'));
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000);
}

bootstrap().then(() => {
	const messages = [
		'--------------------------------------------',
		`Main server:   http://localhost:${3000}`,
		`Apollo server: http://localhost:${3000}/graphql`,
		'--------------------------------------------',
	];
	messages.forEach((msg) => console.log(`${msg}`));
});
