import { CreatePermissiontDto } from 'src/modules/permission/create-permission-dto';
import { Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/common/repository/permission.repository';
import { Role } from 'src/entities/role.entity';
import { UpdatePermissionDto } from './update-permission-dto';

@Injectable()
export class PermissionService {
  constructor(private readonly perRepo: PermissionRepository) {}
  async createPermission(data: CreatePermissiontDto) {
    return await this.perRepo.createPermission(data);
  }

  async findAll() {
    return await this.perRepo.findAll();
  }

  async findOne(id: number) {
    return await this.perRepo.findOne(id);
  }

  async update(id: number, data: UpdatePermissionDto) {
    return await this.perRepo.update(id, data);
  }
  async remove(id: number) {
    return await this.perRepo.remove(id);
  }
  // async assignRole(roles : Role[]){

  // }
}
