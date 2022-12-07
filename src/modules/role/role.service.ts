import { CreateRoleDto } from './create-role-dto';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/common/repository/role.repository';
import { UpdateRoleDto } from './update-role-dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepo: RoleRepository) {}

  async createRole(data: CreateRoleDto) {
    return await this.roleRepo.createRole(data);
  }

  async findAll() {
    return await this.roleRepo.findAll();
  }

  async findOne(id: number) {
    return await this.roleRepo.findOne(id);
  }

  async update(id: number, data: UpdateRoleDto) {
    return await this.roleRepo.update(id, data);
  }
  async remove(id: number) {
    return await this.roleRepo.remove(id);
  }
}
