import { ValidationPipe } from "./pipes/validation.pipe";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
    const PORT = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () =>
        console.log(`Server started on port: ${PORT}`)
    );
};

start();
