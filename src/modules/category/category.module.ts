import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => SubcategoryModule),
  ],
  exports: [
    CategoryService,
  ],
})
export class CategoryModule {}
