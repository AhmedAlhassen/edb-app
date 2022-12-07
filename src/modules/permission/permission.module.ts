import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { RepositoryModule } from 'src/common/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [PermissionService],
  controllers: [PermissionController],
})
export class PermissionModule {}
