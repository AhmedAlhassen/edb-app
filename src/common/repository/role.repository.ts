import { UpdateRoleDto } from './../../modules/role/update-role-dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { CreateRoleDto } from 'src/modules/role/create-role-dto';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async createRole(data: CreateRoleDto) {
    try {
      const role = await this.roleRepository.create(data);
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('role add faild from DB');
    }
  }

  async findAll() {
    return await this.roleRepository.find({
      relations: {
        permissions: {
          subject: true,
        },
        users: true,
      },
      select: {
        id: true,
        name: true,
        users: {
          id: true,
          username: true,
        },
        permissions: {
          id: true,
          action: true,
          subject: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.roleRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        permissions: {
          subject: true,
        },
        users: true,
      },
      select: {
        id: true,
        name: true,
        users: {
          id: true,
          username: true,
        },
        permissions: {
          id: true,
          action: true,
          subject: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateRoleDto) {
    console.log(data);
    return await this.roleRepository.update(id, data);
  }

  async remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
