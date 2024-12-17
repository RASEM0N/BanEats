import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from '@/core/filters/catch-everything.filter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(morgan('dev'));

	// @TODO Вырубил на время
	// const { httpAdapter } = app.get(HttpAdapterHost);
	// app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => {
				return errors;
			},
		}),
	);
	app.enableCors({
		// @TODO надо настривать
		// origin: [
		// 	'http://localhost:5173',
		// ],

		// пока что оставил для всех
		origin: true,
		methods: ['GET', 'POST'],
	});

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
