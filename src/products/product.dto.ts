import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Nombre del producto.',
    example: 'mouse',
  })
  name?: string;

  @ApiProperty({
    description: 'Descripción detallada del producto.',
    example: 'Esta es una descripción detallada del producto...',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto en formato decimal.',
    example: 99.99,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Cantidad de productos en stock.',
    example: 2,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;
}
