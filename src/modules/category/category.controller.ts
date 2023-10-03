import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './category.model';
import { CreateСategoryDto } from './dto/CreateСategoryDto';

@ApiTags('Категории')
@Controller('category')
export class CategoryController {

  constructor(private categoryService: CategoryService) { }
  
  @ApiOperation({ summary: 'Создание новой категории товаров' })
  @ApiResponse({ status: 200, type: [Category] })
  @Post()
  create(@Body() categoryDto: CreateСategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @ApiOperation({ summary: 'Получить категории' })
  @ApiResponse({ status: 200 })
  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @ApiOperation({ summary: 'Получить категорию по айди' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('/:id')
  getCategoryById(@Param('id') categoryId: number) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @ApiOperation({ summary: 'Получить все подкатегории' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get(':categoryId/subCategory')
  getAllSubcategoryByCategoryId(@Param('categoryId') categoryId: number) {
    return this.categoryService.getAllSubcategoryByCategoryId(categoryId);
  }

  @ApiOperation({ summary: 'Получить все продукты в категории' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get(':categoryId/products')
  getAllProductsByCategoryId(@Param('categoryId') categoryId: number) {
    return this.categoryService.getAllProductsByCategoryId(categoryId);
  }
}
