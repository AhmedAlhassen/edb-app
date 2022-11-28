import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { EnvironmentConfigModule } from 'src/config/environment-config/environment-config.module';
import { JwtModule } from 'src/common/jwt/jwt.module';
import { BcryptModule } from 'src/common/bcrypt/bcrypt.module';
import { RepositoryModule } from 'src/common/repository/repository.module';

@Module({
  imports: [LoggerModule,EnvironmentConfigModule,JwtModule,BcryptModule,RepositoryModule],
  providers: [AuthService],
  exports:[AuthService],
  controllers: [AuthController],
  
})
export class AuthModule {}
