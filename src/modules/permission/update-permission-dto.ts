import { PartialType } from '@nestjs/swagger';
import { CreatePermissiontDto } from 'src/modules/permission/create-permission-dto';

export class UpdatePermissionDto extends PartialType(CreatePermissiontDto) {}
