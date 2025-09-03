import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orderServicio: OrdersService) {}

  @Post()
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.orderServicio.addOrder(userId, products);
  }

  @Get(`:id`)
  getOrder(@Query(`id`) id: string) {
    return this.orderServicio.getOrder(id);
  }
}
