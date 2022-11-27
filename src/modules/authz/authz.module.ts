import { Global, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionsGuard } from './permissions.guard';

@Global()
@Module({
    imports: [AuthModule],
    providers: [CaslAbilityFactory, PermissionsGuard],
    exports: [CaslAbilityFactory, PermissionsGuard],
})
export class AuthzModule {}
