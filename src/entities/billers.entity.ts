import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tran } from './tran.entity';

@Entity({ name: 'billers' })
export class Biller {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false, unique: true })
  billerId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  billerKey: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar' })
  createdBy: string;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @CreateDateColumn({ name: 'updateddate' })
  updateddate: Date;

  @ManyToOne(() => Tran, (tran) => tran.biler)
  trans: Tran[];
}
