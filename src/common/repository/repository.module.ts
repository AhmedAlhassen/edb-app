import { TranRepository } from './tran.repository';
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
import { Biller } from 'src/entities/billers.entity';
import { BillerRepository } from './biller.repository';
import { Tran } from 'src/entities/tran.entity';
import { Neelian } from 'src/entities/neelian.entity';
import { NeelianRepository } from './neelian.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      User,
      Subject,
      Permission,
      Role,
      Biller,
      Tran,
      Neelian,
    ]),
  ],
  providers: [
    UserRepository,
    SubjectRepository,
    PermissionRepository,
    RoleRepository,
    BillerRepository,
    TranRepository,
    NeelianRepository,
  ],
  exports: [
    UserRepository,
    SubjectRepository,
    PermissionRepository,
    RoleRepository,
    BillerRepository,
    TranRepository,
    NeelianRepository,
  ],
})
export class RepositoryModule {}
