import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user';
import { FindUserDto } from './dto/find-user';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) { };

  async createUser(userDto: CreateUserDto): Promise<Users> {
    const newUser = await this.userRepository.create(userDto);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findeUser(userDto: FindUserDto) {
    return this.userRepository.findOne({
      where: {
        email: userDto.email,
        password: userDto.password,
      }
    });
  }

  async getUsersByEmail(userEmail: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: userEmail,
      }
    });
    
    return user;
  }
}
