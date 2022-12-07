import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { CreatePermissiontDto } from 'src/modules/permission/create-permission-dto';
import { UpdatePermissionDto } from 'src/modules/permission/update-permission-dto';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(data: CreatePermissiontDto) {
    try {
      const perm = await this.permissionRepository.create(data);
      await this.permissionRepository.save(perm);
      return perm;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('faild DB');
    }
  }

  async findAll() {
    return await this.permissionRepository.find({
      relations: {
        roles: true,
        subject: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.permissionRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        roles: true,
        subject: true,
      },
    });
  }

  async update(id: number, data: UpdatePermissionDto) {
    console.log(data);
    return await this.permissionRepository.update(id, data);
  }

  async remove(id: number) {
    return this.permissionRepository.delete(id);
  }
}
