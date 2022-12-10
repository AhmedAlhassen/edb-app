import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from 'src/config/environment-config/environment-config.service';
import { LoggerModule } from 'src/logger/logger.module';
import { NeelianService } from './neelian.service';
import { NeelianController } from './neelian.controller';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    HttpModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        timeout: configService.getHttpTimeOut(),
        baseURL: configService.getNeelianApi(),
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [NeelianService],
  exports: [NeelianService],
  controllers: [NeelianController],
})
export class NeelianModule {}
