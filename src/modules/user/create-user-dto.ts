import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/entities/role.entity';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
   username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
   password: string;
  
  @ApiProperty()
  @IsOptional()
  role?:Role
}
