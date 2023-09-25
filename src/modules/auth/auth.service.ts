import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user';
import * as bcrypt from 'bcryptjs';
import { Users } from '../users/users.model';
import { FindUserDto } from '../users/dto/find-user';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) {}
  
  async login(userDto: FindUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);

    if(user){
      throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const newUser = await this.userService.createUser({ ...userDto, password: hashPassword });

    return this.generateToken(newUser);
  }

  private async generateToken(user: Users) {
    const payload = {name: user.name, email: user.email, id: user.id, phone: user.phone};

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: FindUserDto){
    const user = await this.userService.getUsersByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals){
      return user;
    }
    throw new UnauthorizedException({massage: 'Некорректный email или пароль!'});
  }
}
