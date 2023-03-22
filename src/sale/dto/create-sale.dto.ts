import { IsNumber, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  readonly order: string;

  @IsNumber()
  readonly vat: number;

  @IsNumber()
  readonly total: number;
}
