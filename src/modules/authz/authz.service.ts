import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/repository/user.repository';

@Injectable()
export class AuthzService {
    private readonly userRepo :UserRepository;
    constructor(){
        
    }
    async findAllPermissionsOfUser(username:string){
        return this.userRepo.findAllPermissionsOfUser(username)
     }
}
