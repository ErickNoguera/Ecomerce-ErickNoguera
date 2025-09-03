import { Module } from '@nestjs/common';
import { ProductsControllers } from './products.controllers';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Categories } from 'src/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsControllers],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
