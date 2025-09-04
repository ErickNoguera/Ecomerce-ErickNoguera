import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: `ID del usuario que realiza la orden`,
    example: `123e4585-g89v-12d5-a487-4521036552`,
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: `lista de productos incluidas en la orden`,
    type: [Products],
    example: [
      { id: `abc123`, name: `Product 1`, price: 100 },
      { id: `def456`, name: `Product 2`, price: 150 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
