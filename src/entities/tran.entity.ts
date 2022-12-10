import { PaymentM } from 'src/modules/trans/dto/tran-dto';
import { Status } from 'src/modules/trans/tran.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Biller } from './billers.entity';
import { Neelian } from './neelian.entity';
@Entity({ name: 'trans' })
export class Tran {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  uuid: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  billId: string;

  @Column({ type: 'decimal', nullable: false })
  amt: number;

  @Column({ type: 'decimal', nullable: false })
  commission: number;

  // @Column({ type: 'int', nullable: false })
  // classNo: number;

  @Column({ type: 'enum', enum: PaymentM, nullable: false })
  paymentM: PaymentM;

  @Column({ type: 'varchar', nullable: false })
  curr: string;

  @Column({ type: 'varchar', nullable: true })
  Account?: string;

  @Column({ type: 'varchar', nullable: true })
  tellerTranRef?: string;

  @Column({ type: 'varchar', nullable: true })
  chequeDate: string;

  @Column({ type: 'varchar', nullable: true })
  chequeCollectRef?: string;

  @Column({ type: 'varchar', nullable: true })
  chequeNo?: string;

  @Column({ type: 'varchar', unique: true })
  voucher: string;

  @Column('text')
  branch: string;

  @Column({ type: 'varchar' })
  createdBy: string;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @CreateDateColumn({ name: 'updateddate' })
  updateddate: Date;

  @OneToMany(() => Biller, (biller) => biller.trans)
  biler: Biller;
}
