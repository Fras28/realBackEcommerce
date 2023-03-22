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
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get()
  async getSales(@Query() paginationQuery: PaginationQueryDto) {
    return this.saleService.findAll({
      limit: paginationQuery.limit,
      skip: paginationQuery.skip,
    });
  }

  @Get(':id')
  async getSale(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }

  @Post()
  async createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.createOne(createSaleDto);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.saleService.updateOne(id, updateSaleDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.saleService.deleteOne(id);
  }
}
