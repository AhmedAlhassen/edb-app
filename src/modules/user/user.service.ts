import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { UserRepository } from 'src/common/repository/user.repository';
import { CreateUserDto } from './create-user-dto';
import { UpdateUserDto } from './update-user-dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly bcrypt: BcryptService,
  ) {}

  async createUser(user: CreateUserDto) {
    const hashPass = await this.bcrypt.hash(user.password);
    user.password = hashPass;
    return await this.userRepo.createUser(user);
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(id: number) {
    return await this.userRepo.findOne(id);
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.userRepo.update(id, data);
  }
  async remove(id: number) {
    return await this.userRepo.remove(id);
  }
}
