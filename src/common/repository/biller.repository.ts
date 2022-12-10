import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Biller } from 'src/entities/billers.entity';
import { CreateBillerDto } from 'src/modules/biller/dto/create-biller-dto';
import { UpdateBillerDto } from 'src/modules/biller/dto/update-biller-dto';
import { Repository } from 'typeorm';

@Injectable()
export class BillerRepository {
  constructor(
    @InjectRepository(Biller)
    private readonly tranRepository: Repository<Biller>,
  ) {}

  async craeteSubject(data: CreateBillerDto) {
    const biller = await this.tranRepository.create(data);
    return await this.tranRepository.save(biller);
  }

  async findAll() {
    return await this.tranRepository.find({
      relations: {
        trans: true,
      },
      select: {
        id: true,
        name: true,
        billerId: true,
        billerKey: true,
        trans: true,
        createdBy: true,
        createdate: true,
        updateddate: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.tranRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        trans: true,
      },
      select: {
        id: true,
        name: true,
        billerId: true,
        billerKey: true,
        trans: true,
        createdBy: true,
        createdate: true,
        updateddate: true,
      },
    });
  }

  async findByBillerId(billerId: string) {
    this.tranRepository.findOneByOrFail({ billerId: billerId });
  }

  async update(id: number, data: UpdateBillerDto) {
    console.log(data);
    return await this.tranRepository.update(id, data);
  }

  async remove(id: number) {
    return this.tranRepository.delete(id);
  }
}
