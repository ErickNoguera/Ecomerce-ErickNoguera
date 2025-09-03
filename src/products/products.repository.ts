import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/archivo.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      return `Producto con id: ${id} no encontrado`;
    }
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Products();

      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate([`description`, `price`, `imgUrl`, `stock`], [`name`])
        .execute();
    });
    return `Productos agregados`;
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updateProduct = await this.productsRepository.findOneBy({ id });
    return updateProduct;
  }
}

// import { Injectable } from '@nestjs/common';

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: boolean;
//   imgUrl: string;
// }

// @Injectable()
// export class ProductRepository {
//   private products = [
//     {
//       id: 1,
//       name: 'Samsung Odyssey G8',
//       description: 'Monitor Led of Ultimate gereation in the world',
//       price: 299.99,
//       stock: true,
//       imgUrl:'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/130380195_01/w=1500,h=1500,fit=pad',
//     },
//     {
//       id: 2,
//       name: 'Teclado Redragon ',
//       description: 'Keyboard mecanic gaming the ultimate tecnology',
//       price: 99.99,
//       stock: false,
//       imgUrl:'https://fotosol.cl/cdn/shop/products/KUMARA_RGB_REDRAGON_1200x.jpg?v=1598387591',
//     },
//     {
//       id: 3,
//       name: 'Mouse vertical pro fit-K75501WW',
//       description: 'Mouse vertical pro the ultimate tecnology',
//       price: 49.99,
//       stock: true,
//       imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL6Hlz0y3w7KZ5SIhMeesswjyHNzxZ--u0Jw&s',
//     },
//     {
//       id: 4,
//       name: 'Chair Gaming',
//       description:'Chair gaming for office, the ultimate tecnologi in the world',
//       price: 359.99,
//       stock: false,
//       imgUrl:'https://www.ulrik.cl/cdn/shop/products/open-uri20210409-3533-hvxv58_1500x.jpg?v=1686088950',
//     },
//     {
//       id: 5,
//       name: 'Acer nitro5 AN515-57-56EM-3',
//       description:'notebook gaming the ultimate tecnology',
//       price: 989.99,
//       stock: true,
//       imgUrl:'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/123907109_01/w=800,h=800,fit=pad',
//     },
//   ];

//   getProducts(){
//     return this.products;
//   }
// }
