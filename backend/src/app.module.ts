import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { StatsModule } from './stats/stats.module';
import { FounderModule } from './founder/founder.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { LeadsModule } from './leads/leads.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ContactModule } from './contact/contact.module';
import { BlogModule } from './blog/blog.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CoursesModule,
    StatsModule,
    FounderModule,
    TestimonialsModule,
    LeadsModule,
    StudentModule,
    OrdersModule,
    PaymentModule,
    ContactModule,
    BlogModule,
    AdminModule,
  ],
})
export class AppModule {}
