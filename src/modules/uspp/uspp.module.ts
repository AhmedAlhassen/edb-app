import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from 'src/config/environment-config/environment-config.service';
import { LoggerModule } from 'src/logger/logger.module';
import { UsppService } from './uspp.service';

@Module({
  imports: [
    LoggerModule,
    HttpModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        timeout: configService.getHttpTimeOut(),
        baseURL: configService.getUsppApi(),
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [UsppService],
  exports: [UsppService],
})
export class UsppModule {}
