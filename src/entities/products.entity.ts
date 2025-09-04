import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: `products`,
})
export class Products {
  /**
   * Identificador único del Producto en formato UUID, proporcionado por la aplicación.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  /**
   * Debe ser un strin hasta 50 Carácteres
   * @example "mouse"
   */
  @Column({
    type: `varchar`,
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  /**
   * Debe contener un texto plano, sin límite específico de caracteres.
   * @example "Esta es una descripción detallada del producto..."
   */
  @Column({
    type: `text`,
    nullable: false,
  })
  description: string;

  /**
   * Debe ser un valor decimal entre 0.01 y  99999999.99
   * @example "99.99"
   */
  @Column({
    type: `decimal`,
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  /**
   * Cantidad disponible en inventario. Dede ser un número entero positivo
   * @example "2"
   */
  @Column({
    type: `int`,
    nullable: false,
  })
  stock: number;

  /**
   * URL de la imagen representativa del producto.
   * Si no se proporciona una URL, se utilizará una imagen predeterminada.
   * @example "https://example.com/product-image.jpg"
   */
  @Column({
    type: `text`,
    default: `https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-avaliable-icon-flat-vector.jpg`,
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: `category_id` })
  category: Categories;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
