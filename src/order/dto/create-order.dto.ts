import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  readonly table: number;

  @IsArray()
  readonly items: [];

  @IsNumber()
  readonly total: number;
}
