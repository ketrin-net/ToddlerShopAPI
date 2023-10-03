import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/modules/category/category.model';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/CreateSubcategoryDto';

export class ProductDto {
  @ApiProperty({ example: '7', description: 'Айди продукта' })
  productId: number;
}

@ApiTags('Подкатегории')
@Controller('subcategory')
export class SubcategoryController {
  
  constructor(private subcategoryService: SubcategoryService) { }

  @ApiOperation({ summary: 'Создание новой подкатегории товаров' })
  @ApiResponse({ status: 200, type: [Category] })
  @Post()
  create(@Body() subcategoryDto: CreateSubcategoryDto) {
    return this.subcategoryService.createSubcategory(subcategoryDto);
  }

  // @ApiOperation({ summary: 'Получить все подкатегории по айди категории' })
  // @ApiResponse({ status: 200, type: [Category] })
  // @Get('/:id/subCategory')
  // getAllSubcategoryByCategoryId(@Param('id') categoryId: number) {
  //   return this.subcategoryService.getAllSubcategoryByCategoryId(categoryId);
  // }

  @ApiOperation({ summary: 'Добавить товар в подкатегорию' })
  @ApiResponse({ status: 200 })
  @Post('/:subcategoryId/add')
  addProductInSubcategory(@Param('subcategoryId') subcategoryId: number, @Body() product: ProductDto) {
    return this.subcategoryService.addProductInSubcategory(subcategoryId, product);
  }

  @ApiOperation({ summary: 'Получить все товары по айди подкатегории' })
  @ApiResponse({ status: 200 })
  @Get('/:id/products')
  getAllProductsInSubcategory(@Param('id') subcategoryId: number) {
    return this.subcategoryService.getAllProductsInSubcategory(subcategoryId);
  }
}
