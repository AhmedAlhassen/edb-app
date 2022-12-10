import { PartialType } from '@nestjs/swagger';
import { CreateBillerDto } from './create-biller-dto';

export class UpdateBillerDto extends PartialType(CreateBillerDto) {}
