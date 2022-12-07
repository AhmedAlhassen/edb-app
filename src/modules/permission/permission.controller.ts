import { CreatePermissiontDto } from './create-permission-dto';
import { Body, Controller, Param } from '@nestjs/common';
import {
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { PermissionService } from './permission.service';

import { ApiTags } from '@nestjs/swagger';
import { UpdatePermissionDto } from './update-permission-dto';

@Controller('permission')
@ApiTags('Permissions')
export class PermissionController {
  constructor(private readonly permService: PermissionService) {}

  @Post()
  async createpermission(@Body() data: CreatePermissiontDto) {
    return await this.permService.createPermission(data);
  }

  @Get()
  findAll() {
    return this.permService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permService.remove(+id);
  }
}
