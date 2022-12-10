import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tran } from './tran.entity';

@Entity({ name: 'Neelian' })
export class Neelian {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  uniNo: string;

  @Column({ type: 'int', nullable: false })
  classNo: number;

  @Column({ type: 'varchar' })
  createdBy: string;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @CreateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
