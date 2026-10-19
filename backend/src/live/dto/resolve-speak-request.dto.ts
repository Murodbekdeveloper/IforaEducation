import { IsEnum } from 'class-validator';

export enum SpeakRequestResolution {
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
}

export class ResolveSpeakRequestDto {
  @IsEnum(SpeakRequestResolution)
  status: SpeakRequestResolution;
}
