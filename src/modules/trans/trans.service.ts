import { TranRepository } from './../../common/repository/tran.repository';
import { Injectable } from '@nestjs/common';
import { TranDto } from './dto/tran-dto';
import { Transaction } from './tran.model';

@Injectable()
export class TransService {
  constructor(private readonly tranRepo: TranRepository) {}
  async payFees(tran: Transaction) {
    console.log(tran);

    return await this.tranRepo.craete(tran);
  }
}
