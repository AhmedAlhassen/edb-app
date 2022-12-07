import { User } from 'src/entities/user.entity';
import { Permission } from './../../entities/permission.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  users: User[];

  @ApiProperty()
  @IsOptional()
  permissions: Permission[];
}
