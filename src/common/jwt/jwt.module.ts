import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt.service';

@Module({
  providers: [JwtTokenService],
  exports: [JwtTokenService]
})
export class JwtModule {}
