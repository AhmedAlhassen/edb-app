import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from 'src/common/repository/repository.module';
import { AuthModule } from '../auth/auth.module';
import { AuthzService } from './authz.service';


import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionsGuard } from './permissions.guard';

@Global()
@Module({
    imports: [AuthModule,RepositoryModule],
    providers: [CaslAbilityFactory, PermissionsGuard,AuthzService],
    exports: [CaslAbilityFactory, PermissionsGuard,AuthzService],
})
export class AuthzModule {}
