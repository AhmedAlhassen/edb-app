import { SubjectRepository } from './subject.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from 'src/config/typeorm/typeorm.module';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { Subject } from 'src/entities/subject.entity';
import { Permission } from 'src/entities/permission.entity';
import { PermissionRepository } from './permission.repository';
import { Role } from 'src/entities/role.entity';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Subject, Permission, Role]),
  ],
  providers: [
    UserRepository,
    SubjectRepository,
    PermissionRepository,
    RoleRepository,
  ],
  exports: [
    UserRepository,
    SubjectRepository,
    PermissionRepository,
    RoleRepository,
  ],
})
export class RepositoryModule {}
