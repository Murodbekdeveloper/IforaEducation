import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLiveSessionDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  youtubeVideoId?: string;

  @IsDateString()
  scheduledAt: string;
}
