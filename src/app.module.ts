import { Logger, Module } from '@nestjs/common';

import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthzService } from './modules/authz/authz.service';
import { AuthzModule } from './modules/authz/authz.module';
import { UserModule } from './modules/user/user.module';
import { BcryptModule } from './common/bcrypt/bcrypt.module';
import { JwtModule } from './common/jwt/jwt.module';
import { ExceptionsModule } from './common/exceptions/exceptions.module';
import { RepositoryModule } from './common/repository/repository.module';

@Module({
  imports: [EnvironmentConfigModule, LoggerModule, AuthModule, AuthzModule, UserModule, BcryptModule, JwtModule, ExceptionsModule, RepositoryModule,],

  providers: [Logger],
})
export class AppModule {}
