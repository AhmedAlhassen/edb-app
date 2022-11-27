import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from 'src/config/typeorm/typeorm.module';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
    imports:[TypeOrmConfigModule, TypeOrmModule.forFeature([User])],
    providers:[UserRepository],
    exports: [UserRepository]
})
export class RepositoryModule {}
