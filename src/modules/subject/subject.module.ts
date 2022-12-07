import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { RepositoryModule } from 'src/common/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
