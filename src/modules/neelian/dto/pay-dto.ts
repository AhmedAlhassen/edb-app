import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString,} from 'class-validator';
export class payDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    universityno:string;
    
    @ApiProperty()
    @IsNotEmpty()
    
    @IsNumber()
    amount:number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currency:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    branch:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    voucher_no:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    class_no:number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    fib:number;
}