import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @CreateDateColumn({ name: 'updateddate' })
  updateddate: Date;

  @Column({ nullable: true })
  last_login?: Date;

  @Column('varchar', { nullable: true })
  hach_refresh_token: string;
  
  @ManyToOne(()=>Role, (role)=>role.users)
  role:Role
}