import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { CreateUserDto } from "src/modules/user/create-user-dto";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository{
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
    async createUser(user:CreateUserDto){
      try {
        const userobj = this.userRepository.create(user);
        return this.userRepository.save(userobj);
      } catch (error) {
        console.log(error)
      }
         
    }
    
      async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
        await this.userRepository.update(
          {
            username: username,
          },
          { hach_refresh_token: refreshToken },
        );
      }
    
      async getUserByUsername(username: string): Promise<User|null> {
          const user = await this.userRepository.findOne({
            where: {
              username: username,
            },
            relations:{
                role:true
            }
          });
          
          if(!user){
              return null
          }
          return user;
      }
    
      async updateLastLogin(username: string): Promise<void> {
        await this.userRepository.update(
          {
            username: username,
          },
          { last_login: () => 'CURRENT_TIMESTAMP' },
        );
      }
      
      async findAllPermissionsOfUser(username: string){
       const userperm = await this.userRepository.findOne({
            where: {
              username: username,
            },
            relations:{
                role:{
                    permissions:true
                }
            }
          });
          
          if(!userperm){
              return null
          }
          return userperm.role.permissions;
      }
}