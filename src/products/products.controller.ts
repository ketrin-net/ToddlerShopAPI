import { Controller, Post, Get, Body, Delete, Put, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Products } from './products.model';
import { CreateProductCardsDto } from './dto/create-product';
import { ProductsService } from './products.service';
import { ChangeInStockProductDto } from './dto/change-inStock-product';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {

  constructor(private productService: ProductsService) { }

  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200, type: Products })
  @Post('/add')
  create(@Body() productDto: CreateProductCardsDto) {
    return this.productService.createProduct(productDto);
  }

  @ApiOperation({ summary: 'Получить все товары' })
  @ApiResponse({ status: 200, type: [Products] })
  @Get('/all')
  getAll() {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'Изменить значение наличия товара на складе' })
  @Patch()
  delete(@Body() dto: ChangeInStockProductDto) {
    return this.productService.changeInStock(dto);
  }
}
