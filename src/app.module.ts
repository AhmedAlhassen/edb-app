import { Logger, Module } from '@nestjs/common';

import { EnvironmentConfigModule } from './config/environment-config/environment-config.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';

import { UserModule } from './modules/user/user.module';
import { BcryptModule } from './common/bcrypt/bcrypt.module';
import { JwtModule } from './common/jwt/jwt.module';
import { ExceptionsModule } from './common/exceptions/exceptions.module';
import { RepositoryModule } from './common/repository/repository.module';
import { SubjectModule } from './modules/subject/subject.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './common/strategies/local.strategy';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './common/strategies/jwtRefresh.strategy';

@Module({
  imports: [
    PassportModule,
    EnvironmentConfigModule,
    LoggerModule,
    AuthModule,

    UserModule,
    BcryptModule,
    JwtModule,
    ExceptionsModule,
    RepositoryModule,
    SubjectModule,
    PermissionModule,
    RoleModule,
  ],

  providers: [Logger, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
