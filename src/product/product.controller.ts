import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(@Query() paginationQuery: PaginationQueryDto) {
    return this.productService.findAll({
      limit: paginationQuery.limit,
      skip: paginationQuery.skip,
    });
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createOne(createProductDto);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateOne(id, updateProductDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }
}
