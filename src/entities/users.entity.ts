import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: `users`,
})
export class Users {
  /**
   * Identificador único del usuario en formato UUID, proporcionado por la aplicación.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  /**
   * Debe ser un string de maximo 50 carácteres
   * @example "User"
   */
  @Column({
    type: `varchar`,
    length: 50,
    nullable: false,
  })
  name: string;

  /**
   * Debe ser un strin y un email válido
   * @example "testuser@example.com"
   */
  @Column({
    type: `varchar`,
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  /**
   * Debe ser un strin entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula,
   * al menos un número y al menos uno de los siguientes carácteres especiales: !@#$%^&*()_-+={}[]|:;"'<>,.?/\
   * @example "aaBB123#"
   */
  @Column({
    type: `varchar`,
    length: 120,
    nullable: false,
  })
  password: string;

  /**
   * Debe ser un número
   * @example "12345678"
   */
  @Column({
    type: `int`,
  })
  phone: number;

  /**
   * Debe ser un string entre 3 y 20 carácteres
   * @example "USA"
   */
  @Column({
    type: `varchar`,
    length: 50,
  })
  country: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example "Test Street 1234"
   */
  @Column({
    type: `text`,
  })
  address: string;

  /**
   * Debe ser un string entre 4 y 20 carácteres
   * @example "Lima"
   */
  @Column({
    type: `varchar`,
    length: 50,
  })
  city: string;

  /**
   * Debe ser un numero 1 y 2  carácteres
   * @example "12"
   */
  @Column({
    type: `int`,
  })
  age: number;

  @ApiHideProperty()
  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: `order_id` })
  orders: Orders[];
}
