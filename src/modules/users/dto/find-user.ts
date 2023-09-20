import { ApiProperty } from "@nestjs/swagger";

export class FindUserDto {
  @ApiProperty({ example: 'ivan@gmail.com', description: 'Почта пользователя' })
  readonly email: string;

  @ApiProperty({ example: 'sFe7&#ic', description: 'Пароль' })
  readonly password: string;
}