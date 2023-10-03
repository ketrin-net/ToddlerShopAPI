import { ApiProperty } from "@nestjs/swagger";

export class CreateProductCardsDto {
  
  @ApiProperty({ example: 'https://194.87.210.5:5000/toddlerShop/BabytonBabyBed.png', description: 'Ссылка на фотографию товара' })
  readonly imgSrc: string;

  @ApiProperty({ example: 'linen', description: 'Описание фотографии' })
  readonly imgAlt: string;

  @ApiProperty({ example: 'Постельное белье Forest Sky (3 предмета)', description: 'Описание товара' })
  readonly title: string;

  @ApiProperty({ example: '2000', description: 'Цена товара' })
  readonly cost: number;

  @ApiProperty({ example: '5439', description: 'Старая цена товара' })
  readonly oldCost?: number;

  @ApiProperty({ example: 'false', description: 'Отметить товар как новый или нет' })
  readonly iconNew: boolean;

  @ApiProperty({ example: 'true', description: 'Есть ли товар сейчас на складе' })
  readonly inStock: boolean;
}