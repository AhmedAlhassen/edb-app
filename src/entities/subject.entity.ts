import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Subject{
    
    @PrimaryGeneratedColumn()
    id:number;
    
    @Index({ unique: true })
    @Column('varchar', { unique: true })
    name:string;
    
    @OneToMany(()=> Permission, (permission)=> permission.subject)
    permissions:Permission[]
}