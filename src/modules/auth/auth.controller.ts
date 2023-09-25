import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user';
import { FindUserDto } from '../users/dto/find-user';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: FindUserDto) {
    return this.authService.login(userDto);
  }

  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  currentUser(@Request() req) {
    return req.user;
  }
}
