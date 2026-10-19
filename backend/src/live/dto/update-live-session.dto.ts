import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateLiveSessionDto } from './create-live-session.dto';

export enum LiveSessionStatusDto {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
}

export class UpdateLiveSessionDto extends PartialType(CreateLiveSessionDto) {
  @IsOptional()
  @IsEnum(LiveSessionStatusDto)
  status?: LiveSessionStatusDto;
}
