import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: `categories`,
})
export class Categories {
  @ApiHideProperty()
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  /**
   * Debe ser un string hasta 50 carácteres
   * @example "Teclados"
   */
  @Column({
    type: `varchar`,
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
