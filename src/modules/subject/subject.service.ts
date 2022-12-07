import { SubjectRepository } from './../../common/repository/subject.repository';
import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './create-subject-dto';
import { UpdateSubjectDto } from './update-subject-dto';

@Injectable()
export class SubjectService {
  constructor(private readonly subRepo: SubjectRepository) {}
  async createSubject(data: CreateSubjectDto) {
    return await this.subRepo.craeteSubject(data);
  }

  async findAll() {
    return await this.subRepo.findAll();
  }

  async findOne(id: number) {
    return await this.subRepo.findOne(id);
  }

  async update(id: number, data: UpdateSubjectDto) {
    return await this.subRepo.update(id, data);
  }
  async remove(id: number) {
    return await this.subRepo.remove(id);
  }
}
