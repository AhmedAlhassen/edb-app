import { TranDto } from './tran-dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTranDto extends PartialType(TranDto) {}
