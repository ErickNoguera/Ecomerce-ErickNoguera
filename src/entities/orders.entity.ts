import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({
  name: `orders`,
})
export class Orders {
  /**
   * Identificador único de la orden en formato UUID, proporcionado por la aplicación.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @ApiProperty({
    description: 'Debe ser una fecha del tipo dd/mm/yyyy',
    example: '01/01/2024',
  })
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: `user_id` })
  user: Users;
}
