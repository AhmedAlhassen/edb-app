import { Ability } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Permission } from "src/entities/permission.entity";
import { User } from "src/entities/user.entity";
import { AuthService } from "../auth/auth.service";

export enum PermissionAction {
    ALL = "all",
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
  }

  export type PermissionObjectType = any;
  export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
  
  interface CaslPermission {
    action: PermissionAction;
    // In our database, Invoice, Project... are called "object"
    // but in CASL they are called "subject"
    subject: string;
  }
  
  @Injectable()
export class CaslAbilityFactory {
    
    constructor(private authService : AuthService){}
    
    async createForUser(user: User): Promise<AppAbility> {
        const dbPermissions: Permission[] = await this.authService.findAllPermissionsOfUser(user.username);
        const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
            action: p.action,
            subject: p.subject.name,
          }));
        
          return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
    }
}
