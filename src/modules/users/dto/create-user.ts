import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  readonly name: string;
  
  @ApiProperty({ example: '8XXXXXXXXXX', description: 'Номер телефона' })
  readonly phone: string;

  @ApiProperty({ example: 'ivan@gmail.com', description: 'Почта пользователя' })
  readonly email: string;

  @ApiProperty({ example: 'sFe7&#ic', description: 'Пароль' })
  readonly password: string;

}