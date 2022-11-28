import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/common/jwt/jwt.service';
import { UserRepository } from 'src/common/repository/user.repository';
import { EnvironmentConfigService } from 'src/config/environment-config/environment-config.service';
import { LoggerService } from 'src/logger/logger.service';
import { IJwtServicePayload } from './types';

@Injectable()
export class AuthService {
    constructor(private readonly userRepo : UserRepository,
                private readonly logger: LoggerService,
                private readonly jwtConfig: EnvironmentConfigService,
                private readonly jwtTokenService: JwtTokenService,
                private readonly bcryptService: BcryptService){}
    
   
    
    async getCookieWithJwtToken(username: string){
        this.logger.log('AuthService execute', `The user ${username} have been logged.`);
        const payload: IJwtServicePayload = { username: username };
        
        const secret = this.jwtConfig.getJwtSecret();
        const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
    }
    
    async getCookieWithJwtRefreshToken(username: string) {
        this.logger.log('LoginUseCases execute', `The user ${username} have been logged.`);
        const payload: IJwtServicePayload = { username: username };
        const secret = this.jwtConfig.getJwtRefreshSecret();
        const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
        const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
        await this.setCurrentRefreshToken(token, username);
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
        return cookie;
      }
    
      async validateUserForLocalStragtegy(username: string, pass: string) {
        const user = await this.userRepo.getUserByUsername(username);
        if (!user) {
          return null;
        }
        const match = await this.bcryptService.compare(pass, user.password);
        if (user && match) {
          await this.updateLoginTime(user.username);
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
      
      async validateUserForJWTStragtegy(username: string) {
        const user = await this.userRepo.getUserByUsername(username);
        if (!user) {
          return null;
        }
        return user;
      }
      
      async updateLoginTime(username: string) {
        await this.userRepo.updateLastLogin(username);
      }
      
      async setCurrentRefreshToken(refreshToken: string, username: string) {
        const currentHashedRefreshToken = await this.bcryptService.hash(refreshToken);
        await this.userRepo.updateRefreshToken(username, currentHashedRefreshToken);
      }
      
      async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
        const user = await this.userRepo.getUserByUsername(username);
        if (!user) {
          return null;
        }
        const isRefreshTokenMatching = await this.bcryptService.compare(refreshToken, user.hach_refresh_token);
        if (isRefreshTokenMatching) {
          return user;
        }
    
        return null;
      }
      
      async execute(): Promise<string[]> {
        return ['Authentication=; HttpOnly; Path=/; Max-Age=0', 'Refresh=; HttpOnly; Path=/; Max-Age=0'];
      }
      
}
