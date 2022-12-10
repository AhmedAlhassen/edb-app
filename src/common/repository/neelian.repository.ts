import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Neelian } from 'src/entities/neelian.entity';

import { Repository } from 'typeorm';

@Injectable()
export class NeelianRepository {
  constructor(
    @InjectRepository(Neelian)
    private readonly neelianRepository: Repository<Neelian>,
  ) {}
}
