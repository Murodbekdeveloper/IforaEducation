import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AuthModule } from '../auth/auth.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [AuthModule, StudentModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
