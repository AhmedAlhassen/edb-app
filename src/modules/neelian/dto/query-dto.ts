import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class QueryByUniNoDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    uniNo:string;
}