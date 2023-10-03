import { ApiProperty } from "@nestjs/swagger";
import { Subcategory } from "src/subcategory/subcategory.model";
export class AddSubcategoryInCategoryDto {

  @ApiProperty({ example: '23', description: 'Айди категории' })
  readonly idCategory: number;

  @ApiProperty({ example: '23', description: 'Айди категории' })
  readonly subcategory: Subcategory;
}