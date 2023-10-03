import { Controller, Post, Get, Body, Delete, Put, Patch, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Products } from './products.model';
import { CreateProductCardsDto } from './dto/create-product';
import { ProductsService } from './products.service';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {

  constructor(private productService: ProductsService) { }

  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200, type: Products })
  @Post('/create')
  create(@Body() productDto: CreateProductCardsDto) {
    return this.productService.createProduct(productDto);
  }

  @ApiOperation({ summary: 'Получить все товары' })
  @ApiResponse({ status: 200, type: [Products] })
  @Get()
  getAll() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'Получить 10 рандомных товаров' })
  @ApiResponse({ status: 200, type: [Products] })
  @Get('/random')
  getRandomProducts() {
    return this.productService.getRandomProducts();
  }

  @ApiOperation({ summary: 'Получить все товары с изменной ценной' })
  @ApiResponse({ status: 200, type: [Products] })
  @Get('/discount')
  getAllWithOldCost() {
    return this.productService.getAllProductsWithOldCost();
  }

  @ApiOperation({ summary: 'Получить все товары с отметкой /новое/' })
  @ApiResponse({ status: 200, type: [Products] })
  @Get('/news')
  getAllWithIconNew() {
    return this.productService.getAllProductsWithIconNew();
  }

  @ApiOperation({ summary: 'Изменить значение наличия товара на складе' })
  @Patch('/:subcategoryId/products')
  changeInStockProduct(@Param('isubcategoryIdd') productId: number, @Body() changeInStock: boolean) {
    return this.productService.changeInStock(productId, changeInStock);
  }
}
