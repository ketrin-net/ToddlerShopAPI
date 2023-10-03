import { Module, forwardRef } from '@nestjs/common';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './subcategory.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/modules/category/category.module';
import { ProductsModule } from 'src/modules/products/products.module';

@Module({
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
  imports: [
    TypeOrmModule.forFeature([Subcategory]),
    forwardRef(() => CategoryModule),
    forwardRef(() => ProductsModule),
  ],
  exports: [
    SubcategoryService,
  ],
})
export class SubcategoryModule {}
