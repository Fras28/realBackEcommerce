import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, SaleDocument } from './schema/sale.schema';

@Injectable()
export class SaleService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<Sale[]> {
    const { limit, skip } = paginationQuery;
    return this.saleModel
      .find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Sale> {
    const sale = await this.saleModel.findOne({ _id: id }).exec();
    if (!sale) {
      throw new NotFoundException(`Sale #${id} not found`);
    }
    return sale;
  }

  async createOne(createSaleDto: CreateSaleDto): Promise<Sale> {
    const cretaeSale = new this.saleModel(createSaleDto);
    return cretaeSale.save();
  }

  async updateOne(id: string, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const existingSale = await this.saleModel
      .findByIdAndUpdate(
        id,
        {
          $set: updateSaleDto,
        },
        { new: true },
      )
      .exec();
    if (!existingSale) {
      throw new NotFoundException(`Sale ${id} not found`);
    }
    return existingSale;
  }
  async deleteOne(id: string): Promise<Sale> {
    const deletedSale = await this.saleModel.findByIdAndDelete(id).exec();
    if (!deletedSale) {
      throw new NotFoundException(`Sale ${id} not found`);
    }
    return deletedSale;
  }
}
