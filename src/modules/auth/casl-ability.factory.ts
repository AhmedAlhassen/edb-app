import { Ability } from '@casl/ability';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Permission } from 'src/entities/permission.entity';
import { User } from 'src/entities/user.entity';

import { AuthService } from './auth.service';

export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
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
  constructor(
    @Inject(forwardRef(() => AuthService))
    private userRepo: AuthService,
  ) {}

  async createForUser(user: User): Promise<AppAbility> {
    console.log('userin', user);
    const dbPermissions: Permission[] =
      await this.userRepo.findAllPermissionsOfUser(user.username);
    console.log(dbPermissions);
    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
      action: p.action,
      subject: p.subject.name,
    }));

    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
