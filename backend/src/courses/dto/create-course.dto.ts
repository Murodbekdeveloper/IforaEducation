import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MinLength(3)
  slug: string;

  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  category: string;

  @IsIn(['Boshlangʻich', 'Oʻrta', 'Pro'])
  level: 'Boshlangʻich' | 'Oʻrta' | 'Pro';

  @IsInt()
  @Min(1)
  durationMonths: number;

  @IsInt()
  @Min(1)
  lessonsCount: number;

  @IsInt()
  @Min(0)
  studentsCount: number;

  @IsInt()
  @Min(0)
  price: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  oldPrice?: number;

  @IsNumber()
  @Min(0)
  rating: number;

  @IsOptional()
  @IsString()
  badge?: string;

  @IsString()
  coverColor: string;
}
