import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Products } from "./modules/products/products.model";
import { ProductsModule } from "./modules/products/products.module";
import { Users } from "./modules/users/users.model";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from "./subcategory/subcategory.module";
import { Category } from "./modules/category/category.model";
import { Subcategory } from "./subcategory/subcategory.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USER,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DB,
      entities: [Products, Users, Category, Subcategory],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule, UsersModule, AuthModule, CategoryModule, SubcategoryModule,
  ]
})
export class AppModule {}