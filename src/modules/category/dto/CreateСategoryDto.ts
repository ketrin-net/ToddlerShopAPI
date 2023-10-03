import { ApiProperty } from "@nestjs/swagger";

export class CreateСategoryDto {

  @ApiProperty({ example: 'Детская мебель', description: 'Называние категории' })
  readonly name: string;
}