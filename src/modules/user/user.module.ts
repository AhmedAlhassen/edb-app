import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BcryptModule } from 'src/common/bcrypt/bcrypt.module';
import { RepositoryModule } from 'src/common/repository/repository.module';

@Module({
  imports:[BcryptModule,RepositoryModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
