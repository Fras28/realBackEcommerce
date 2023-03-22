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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders(@Query() paginationQuery: PaginationQueryDto) {
    return this.orderService.findAll({
      limit: paginationQuery.limit,
      skip: paginationQuery.skip,
    });
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOne(createOrderDto);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOne(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.orderService.deleteOne(id);
  }
}
