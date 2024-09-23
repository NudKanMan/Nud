"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const url = app.get(config_1.ConfigService).get('REVIEW_SERVICE_URL');
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'review',
            url,
            protoPath: (0, path_1.join)(__dirname, '../../proto/review.proto'),
        },
    });
    await app.startAllMicroservices();
}
bootstrap();
//# sourceMappingURL=main.js.map