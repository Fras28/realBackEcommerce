import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<Product[]> {
    const { limit, skip } = paginationQuery;
    return this.productModel
      .find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async createOne(createProductDto: CreateProductDto): Promise<Product> {
    const cretaeProduct = new this.productModel(createProductDto);
    return cretaeProduct.save();
  }

  async updateOne(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateProductDto,
        },
        { new: true },
      )
      .exec();
    if (!existingProduct) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return existingProduct;
  }
  async deleteOne(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return deletedProduct;
  }
}
