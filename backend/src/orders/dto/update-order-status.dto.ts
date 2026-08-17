import { IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsIn(['PENDING', 'CONFIRMED', 'CANCELLED'])
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}
