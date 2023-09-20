import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './modules/users/users.module';
import { Products } from "./modules/products/products.model";
import { ProductsModule } from "./modules/products/products.module";
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [UsersService],
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
      entities: [Products],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
  ]
})
export class AppModule {}