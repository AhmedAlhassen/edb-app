import { CreateRoleDto } from './create-role-dto';
import { Controller, UseGuards } from '@nestjs/common';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { RoleService } from './role.service';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';

import { PermissionAction } from '../auth/casl-ability.factory';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { CheckPermissions } from '../auth/permissions.decorator';

import { UpdateRoleDto } from './update-role-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, 'User'])
  @UseGuards(JwtAuthGuard)
  async createRole(@Body() role: CreateRoleDto) {
    return await this.roleService.createRole(role);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
