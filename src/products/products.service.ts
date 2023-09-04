import { Injectable } from '@nestjs/common';
import { Products } from './products.model';
import { CreateProductCardsDto } from './dto/create-product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeInStockProductDto } from './dto/change-inStock-product';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Products) 
    private productsRepository: Repository<Products>,
    ) { };

  async createProduct(productDto: CreateProductCardsDto): Promise<Products>  {
    const newProduct = await this.productsRepository.create(productDto);
    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async getAllProducts(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async changeInStock(dto: ChangeInStockProductDto) {
    const findProduct = await this.productsRepository.findOne({
      where: {
        id: dto.productId,
      }
    });

    await this.productsRepository.update(findProduct, { inStock: dto.changeInStock});
    await this.productsRepository.save(findProduct);
  }
}
