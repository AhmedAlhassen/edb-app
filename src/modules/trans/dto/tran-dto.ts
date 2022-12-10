import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum PaymentM {
  TRANSFER = 20,
  CASH = 10,
  CHEQUE = 30,
}

export class TranDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  universityno: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  channelId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billerKey: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  branch: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  class_no: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentM)
  paymentMethod: PaymentM;

  @ApiProperty()
  @IsString()
  @IsOptional()
  account?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tellerTranRef?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  chequeDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  chequeCollectRef?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  chequeNo?: string;
}
