import { IsString, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsString()
  @MinLength(9)
  phone: string;

  @IsString()
  courseSlug: string;
}
