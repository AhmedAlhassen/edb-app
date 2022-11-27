import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepo : UserRepository){}
    
    async findAllPermissionsOfUser(username:string){
       return this.userRepo.findAllPermissionsOfUser(username)
    }
}
