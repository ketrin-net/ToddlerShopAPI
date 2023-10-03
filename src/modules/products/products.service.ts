import { Injectable } from '@nestjs/common';
import { Products } from './products.model';
import { CreateProductCardsDto } from './dto/create-product';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

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
    return await this.productsRepository.find()
  }

  async getProductById(productId: number): Promise<Products> {
    return await this.productsRepository.findOne({ where: { id: productId } })
  }

  async getAllProductsWithIconNew(): Promise<Products[]> {
    return await this.productsRepository.find({ where: { iconNew: true } })
  }

  async getAllProductsWithOldCost(): Promise<Products[]> {
    return await this.productsRepository.find({ where: { oldCost: Not(IsNull()) } });
  }

  async changeInStock(productId: number ,subcategoryId: boolean) {
    const findProduct = await this.productsRepository.findOne({
      where: {
        id: productId,
      }
    });
    
    await this.productsRepository.save({
      id: productId,
      inStock: subcategoryId,
    });
  }

  async getRandomProducts(): Promise<Products[]>{
    return await this.productsRepository.createQueryBuilder()
      .orderBy('RANDOM()')
      .take(10)
      .getMany();
  }
}
