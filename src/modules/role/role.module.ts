import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RepositoryModule } from 'src/common/repository/repository.module';

@Module({
  imports: [AuthModule, RepositoryModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
