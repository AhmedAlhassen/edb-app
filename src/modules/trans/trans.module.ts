import { UsppModule } from './../uspp/uspp.module';
import { Module } from '@nestjs/common';
import { TransService } from './trans.service';
import { TransController } from './trans.controller';
import { NeelianModule } from '../neelian/neelian.module';
import { RepositoryModule } from 'src/common/repository/repository.module';
import { BillerModule } from '../biller/biller.module';

@Module({
  imports: [UsppModule, NeelianModule, RepositoryModule, BillerModule],
  providers: [TransService],
  controllers: [TransController],
})
export class TransModule {}
