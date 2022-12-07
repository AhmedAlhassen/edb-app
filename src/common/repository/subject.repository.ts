import { CreateSubjectDto } from './../../modules/subject/create-subject-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';

import { Repository } from 'typeorm';
import { UpdateSubjectDto } from 'src/modules/subject/update-subject-dto';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async craeteSubject(data: CreateSubjectDto) {
    const subject = await this.subjectRepository.create(data);
    return await this.subjectRepository.save(subject);
  }

  async findAll() {
    return await this.subjectRepository.find({
      relations: {
        permissions: true,
      },
      select: {
        id: true,
        name: true,
        permissions: {
          id: true,
          action: true,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.subjectRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: {
        permissions: true,
      },
      select: {
        id: true,
        name: true,
        permissions: {
          id: true,
          action: true,
        },
      },
    });
  }

  async update(id: number, data: UpdateSubjectDto) {
    console.log(data);
    return await this.subjectRepository.update(id, data);
  }

  async remove(id: number) {
    return this.subjectRepository.delete(id);
  }
}
