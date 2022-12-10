"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true, credentials: true });
    await app.use(session({
        secret: 'test',
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true, secure: false },
    }));
    await app.use(passport.initialize());
    await app.use(passport.session());
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map