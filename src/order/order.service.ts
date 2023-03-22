import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<Order[]> {
    const { limit, skip } = paginationQuery;
    return this.orderModel
      .find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: id }).exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async createOne(createOrderDto: CreateOrderDto): Promise<Order> {
    const cretaeOrder = new this.orderModel(createOrderDto);
    return cretaeOrder.save();
  }

  async updateOne(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateOrderDto,
        },
        { new: true },
      )
      .exec();
    if (!existingOrder) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return existingOrder;
  }
  async deleteOne(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder) {
      throw new NotFoundException(`Order ${id} not found`);
    }
    return deletedOrder;
  }
}
