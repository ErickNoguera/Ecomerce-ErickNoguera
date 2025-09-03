import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;

    //* VERIFICAMOS QUE EXISTA EL USUARIO
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user)
      throw new NotFoundException(`Usuario con id: ${userId} no encontrado`);

    //* CREAMOS LA ORDEN
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    //* GUARDAMOS LA ORDEN EN LA DB
    const newOrder = await this.ordersRepository.save(order);

    //* ASOCIAMOS CADA "id" RECIBIDO CON EL PRODUCTO
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });

        if (!product)
          throw new NotFoundException(
            `Producto con id: ${element.id} no encontrado`,
          );

        //* CALCULAMOS EL MONTO TOTAL
        total += Number(product.price);

        //* ACTUALIZAMOS EL STOCK DE LA TABLA PRODUCT
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    //* CREAMOS OrdersDetail Y LA INSERTAMOS EN LA DB
    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailRepository.save(orderDetail);

    //* ENVIAMOS AL CLIENTE LA COMPRA CON LA INFO DE LOS PRODUCTOS
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  getOrder(id: string) {
    const order = this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Orden con id: ${id} no encontrada`);
    }

    return order;
  }
}
