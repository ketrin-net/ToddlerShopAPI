import { ApiProperty } from "@nestjs/swagger";

export class CreateSubcategoryDto {

  @ApiProperty({ example: 'Кроватки', description: 'Называние подкатегории' })
  readonly name: string;

  @ApiProperty({ example: '34', description: 'Айди категории, к которой причислить новую подкатегорию' })
  readonly idCategory: number;
}