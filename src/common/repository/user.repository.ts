import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/create-user-dto';
import { UpdateUserDto } from 'src/modules/user/update-user-dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    try {
      console.log(user);
      const userobj = await this.userRepository.create(user);
      console.log(userobj);
      // userobj.role = [{id:1,name:'admin'}]
      await this.userRepository.save(userobj);
      return userobj;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('faild DB');
    }
  }

  async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(
      {
        username: username,
      },
      { hach_refresh_token: refreshToken },
    );
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: {
        role: true,
      },
    });

    if (!user) {
      return null;
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

  async findAllPermissionsOfUser(username: string) {
    const userperm = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: {
        role: {
          permissions: {
            subject: true,
          },
        },
      },
    });
    console.log('perm', userperm);
    if (!userperm) {
      return null;
    }
    return userperm.role.permissions;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        role: {
          permissions: {
            subject: true,
          },
        },
      },
      select: {
        id: true,
        username: true,
        role: {
          id: true,
          name: true,
          permissions: {
            id: true,
            action: true,
            subject: {
              id: true,
              name: true,
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        role: {
          permissions: {
            subject: true,
          },
        },
      },
      select: {
        id: true,
        username: true,
        role: {
          id: true,
          name: true,
          permissions: {
            id: true,
            action: true,
            subject: {
              id: true,
              name: true,
            },
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    console.log(data);
    return await this.userRepository.update(id, data);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
