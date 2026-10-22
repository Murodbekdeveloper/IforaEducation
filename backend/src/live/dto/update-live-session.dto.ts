import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { CreateLiveSessionDto } from './create-live-session.dto';

export class UpdateLiveSessionDto extends PartialType(CreateLiveSessionDto) {
  @IsOptional()
  @IsIn(['SCHEDULED', 'LIVE', 'ENDED'])
  status?: 'SCHEDULED' | 'LIVE' | 'ENDED';
}
