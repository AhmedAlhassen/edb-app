import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";

@Entity()
export class Role{
    
    @PrimaryGeneratedColumn()
    id:number;
    
    @Index({ unique: true })
    @Column('varchar', { unique: true })
    name:string;
    
    @OneToMany(()=>User , (user)=>user.role)
    users:User[]
    
    @ManyToMany(()=>Permission, (permission)=>permission.roles,{  cascade: true,})
    @JoinTable({name:'roles_permissions '})
    permissions: Permission[]
}