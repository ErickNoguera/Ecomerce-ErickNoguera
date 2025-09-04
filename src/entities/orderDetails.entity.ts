import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { Orders } from './orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: `orderdetails`,
})
export class OrderDetails {
  @ApiHideProperty()
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  /**
   * Debe ser un valor decimal entre 0.01 y  99999999.99
   * @example "99.99"
   */
  @Column({
    type: `decimal`,
    precision: 10,
    scale: 2,
  })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: `order_id` })
  order: Orders;

  @ManyToMany(() => Products)
  @JoinTable({
    name: `orderdetails_products`,
    joinColumn: {
      name: `product_id`,
      referencedColumnName: `id`,
    },
    inverseJoinColumn: {
      name: `orderdetails_id`,
      referencedColumnName: `id`,
    },
  })
  products: Products[];
}
