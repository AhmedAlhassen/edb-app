import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import JwtRefreshGuard from 'src/common/guards/jwtRefresh.guard';
import { LoginGuard } from 'src/common/guards/login.guard';

import { AuthLoginDto } from './auth-dto.class';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Req() request: any) {
    console.log(auth);
    const accessTokenCookie = await this.authService.getCookieWithJwtToken(
      auth.username,
    );
    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return 'Login successful';
  }

  @Get('is_authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is_authenticated' })
  async isAuthenticated(@Req() request: any) {
    const user = await this.authService.isAut(request.user.username);

    return user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Req() request: any) {
    const cookie = await this.authService.execute();
    request.res.setHeader('Set-Cookie', cookie);
    return 'Logout successful';
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.authService.getCookieWithJwtToken(
      request.user.username,
    );
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return 'Refresh successful';
  }
}
