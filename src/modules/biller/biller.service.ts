import { Injectable } from '@nestjs/common';
import { BillerRepository } from 'src/common/repository/biller.repository';
import { CreateBillerDto } from './dto/create-biller-dto';
import { UpdateBillerDto } from './dto/update-biller-dto';

@Injectable()
export class BillerService {
  constructor(private readonly billerRepo: BillerRepository) {}

  async createSubject(data: CreateBillerDto) {
    return await this.billerRepo.craeteSubject(data);
  }

  async findAll() {
    return await this.billerRepo.findAll();
  }

  async findOne(id: number) {
    return await this.billerRepo.findOne(id);
  }
  async findByBillerId(bilerId: string) {
    return await this.billerRepo.findByBillerId(bilerId);
  }
  async update(id: number, data: UpdateBillerDto) {
    return await this.billerRepo.update(id, data);
  }
  async remove(id: number) {
    return await this.billerRepo.remove(id);
  }
}
