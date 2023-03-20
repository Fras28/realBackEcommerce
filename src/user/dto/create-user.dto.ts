import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly roles?: string[];

  @IsEmail()
  @IsOptional()
  readonly email?: string;
}
