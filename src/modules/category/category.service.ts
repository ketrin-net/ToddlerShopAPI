import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.model';
import { CreateСategoryDto } from './dto/CreateСategoryDto';
import { Subcategory } from 'src/subcategory/subcategory.model';
import { Products } from '../products/products.model';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { };

  async createCategory(categoryDto: CreateСategoryDto) {
    const newCategory = await this.categoryRepository.create(categoryDto)
    await this.categoryRepository.save(newCategory);

    return newCategory;
  };

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['subCategory'] });
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    return await this.categoryRepository.findOne({ 
      where: { id: categoryId },
      relations: ['subCategory']
     })
  };

  async getAllSubcategoryByCategoryId(categoryId: number): Promise<Subcategory[]> {
    const findCategory = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['subCategory']
    })

    if (!findCategory) {
      throw new HttpException("Такой категории не существует", HttpStatus.BAD_REQUEST)
    }

    return findCategory.subCategory;
  }

  async getAllProductsByCategoryId(categoryId: number): Promise<Products[]> {
    const findCategory = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['subCategory', 'subCategory.products']
    })

    if (!findCategory) {
      throw new HttpException("Такой категории не существует", HttpStatus.BAD_REQUEST)
    }

    const products: Products[] = [];

    findCategory.subCategory.forEach((subCategory) => {
      subCategory.products.forEach((product) => {
        products.push(product);
      });
    });

    return products;
  }
}
