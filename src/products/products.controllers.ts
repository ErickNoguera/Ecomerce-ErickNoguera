import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/users/roles.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Products } from 'src/entities/products.entity';
import { CreateProductDto } from './product.dto';

@ApiTags(`products`)
@Controller('products')
export class ProductsControllers {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query(`page`) page: number = 1,
    @Query(`limit`) limit: number = 2,
  ) {
    if (page && limit) return this.productsService.getProducts(page, limit);
    return this.productsService.getProducts(page, limit);
  }

  @Get(`seeder`)
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get(':id')
  getProduct(@Param(`id`) id: string) {
    return this.productsService.getProduct(id);
  }

  @Put(':id')
  @ApiBody({ type: CreateProductDto })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id') id: string, @Body() product) {
    return this.productsService.updateProduct(id, product);
  }
}
