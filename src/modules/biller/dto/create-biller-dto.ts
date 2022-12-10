import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBillerDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  billerId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  billerKey: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
