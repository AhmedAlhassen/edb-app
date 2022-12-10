import { Module } from '@nestjs/common';
import { BillerService } from './biller.service';
import { BillerController } from './biller.controller';
import { RepositoryModule } from 'src/common/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [BillerService],
  exports: [BillerService],
  controllers: [BillerController],
})
export class BillerModule {}
