import { ApiProperty } from "@nestjs/swagger";

export class ChangeInStockProductDto {
  @ApiProperty({ example: '343', description: 'Ключ товара' })
  productId: number;

  @ApiProperty({ example: 'false', description: 'Новое значение товара на складе' })
  changeInStock: boolean;
}