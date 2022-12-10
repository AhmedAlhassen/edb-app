import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Tran } from 'src/entities/tran.entity';
import { UpdateTranDto } from 'src/modules/trans/dto/update-tran-dto';
import { Transaction } from 'src/modules/trans/tran.model';
import { Repository } from 'typeorm';

@Injectable()
export class TranRepository {
  constructor(
    @InjectRepository(Tran)
    private readonly tranRepository: Repository<Tran>,
  ) {}

  async craete(data: Transaction) {
    const transaction = await this.tranRepository.create({ ...data });
    return await this.tranRepository.save(transaction);
  }

  async findAll() {
    return await this.tranRepository.find({
      relations: {
        biler: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.tranRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        biler: true,
      },
    });
  }

  async update(id: number, data: UpdateTranDto) {
    console.log(data);
    return await this.tranRepository.update(id, data);
  }

  async remove(id: number) {
    return this.tranRepository.delete(id);
  }
}
