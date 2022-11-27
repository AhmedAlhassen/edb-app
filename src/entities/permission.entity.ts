
import { PermissionAction } from "src/modules/authz/casl-ability.factory";
import { Column, Entity, Index, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Subject } from "./subject.entity";

@Entity()
export class Permission{
    
    @PrimaryGeneratedColumn()
    id:number;
    
    @Index({ unique: true })
    @Column({type:'enum',enum:PermissionAction})
    action: PermissionAction;
    
    @ManyToOne(()=>Subject, (subject)=>subject.permissions)
    subject:Subject
    
    @ManyToMany(()=>Role,(role)=>role.permissions)
    roles: Role[]
}