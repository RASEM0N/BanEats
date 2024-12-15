import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from '@/core/filters/catch-everything.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);

	app.use(morgan('dev'));
	app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.APP_PORT);
}

bootstrap().then(() => {
	const port = process.env.APP_PORT;
	const messages = [
		'--------------------------------------------',
		`Main server:   http://localhost:${port}`,
		`Apollo server: http://localhost:${port}/graphql`,
		'--------------------------------------------',
	];
	messages.forEach((msg) => console.log(`${msg}`));
});
