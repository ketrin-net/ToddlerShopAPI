import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { FindUserDto } from './dto/find-user';
import { Users } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) { }
  
}
