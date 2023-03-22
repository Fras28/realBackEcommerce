import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly section: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly available: boolean;
}
