import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { EnvironmentConfigModule } from 'src/config/environment-config/environment-config.module';
import { JwtModule } from 'src/common/jwt/jwt.module';
import { BcryptModule } from 'src/common/bcrypt/bcrypt.module';
import { RepositoryModule } from 'src/common/repository/repository.module';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionsGuard } from './permissions.guard';

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    JwtModule,
    BcryptModule,
    RepositoryModule,
  ],
  providers: [AuthService, CaslAbilityFactory, PermissionsGuard],
  exports: [AuthService, CaslAbilityFactory, PermissionsGuard],
  controllers: [AuthController],
})
export class AuthModule {}
