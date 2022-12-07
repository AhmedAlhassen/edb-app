import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/entities/role.entity';
import { Subject } from 'src/entities/subject.entity';
import { PermissionAction } from '../auth/casl-ability.factory';

export class CreatePermissiontDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(PermissionAction, { each: true })
  action: PermissionAction;

  @ApiProperty()
  @IsOptional()
  subject?: Subject;

  @ApiProperty()
  @IsOptional()
  roles: Role[];
}
