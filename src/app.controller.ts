import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: any): any {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  hello(@Request() request: any): any {
    return request.user;
  }
}
