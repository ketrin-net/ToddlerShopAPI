import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './subcategory.model';
import { CreateSubcategoryDto } from './dto/CreateSubcategoryDto';
import { CategoryService } from 'src/modules/category/category.service';
import { ProductsService } from 'src/modules/products/products.service';
import { ProductDto } from './subcategory.controller';
import { Products } from 'src/modules/products/products.model';

@Injectable()
export class SubcategoryService {

  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
  ) { };

  async getProductsInSubcategory(nameSubcategory: string): Promise<Subcategory[]> {
    return await this.subcategoryRepository.find({
      where: {
        name: nameSubcategory,
      }
    });
  }

  async getSubcategoryById(subcategoryId: number): Promise<Subcategory> {
    return await this.subcategoryRepository.findOne({
      where: {
        id: subcategoryId,
      },
      relations: ['products']
    });
  }

  async createSubcategory(subcategoryDto: CreateSubcategoryDto) {
    const findCategory = await this.categoryService.getCategoryById(subcategoryDto.idCategory);

    const newSubcategory = await this.subcategoryRepository.create({
      ...subcategoryDto,
      category: findCategory,
    })
    await this.subcategoryRepository.save(newSubcategory);

    return newSubcategory;
  }

  async addProductInSubcategory(subcategoryId: number, product: ProductDto) {
    const findSubcat = await this.getSubcategoryById(subcategoryId);
    const findProduct = await this.productService.getProductById(product.productId);

    findSubcat.products.push(findProduct);
    await this.subcategoryRepository.save(findSubcat);

    return findSubcat;
  }

  async getAllProductsInSubcategory(subcategoryId: number): Promise<Products[]>{
    const subcategory = await this.subcategoryRepository.findOne({
      where:{
        id: subcategoryId,
      },
      relations: ['products']
    });

    return subcategory.products;
  }
}
