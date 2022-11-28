import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { UserRepository } from 'src/common/repository/user.repository';
import { CreateUserDto } from './create-user-dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository,private readonly bcrypt: BcryptService){}
    
    async createUser(user:CreateUserDto){
        const hashPass = await this.bcrypt.hash(user.password)
       user.password = hashPass;
        return await this.userRepo.createUser(user)
    }
}
