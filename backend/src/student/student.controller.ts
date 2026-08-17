import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/auth.types';

@UseGuards(JwtAuthGuard)
@Controller('me')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getOverview(@CurrentUser() user: AuthUser) {
    return this.studentService.getOverview(user.id);
  }

  @Get('courses')
  getCourses(@CurrentUser() user: AuthUser) {
    return this.studentService.getCourses(user.id);
  }

  @Get('notifications')
  getNotifications(@CurrentUser() user: AuthUser) {
    return this.studentService.getNotifications(user.id);
  }

  @Get('results')
  getResults(@CurrentUser() user: AuthUser) {
    return this.studentService.getResults(user.id);
  }

  @Get('schedule')
  getSchedule() {
    return this.studentService.getSchedule();
  }
}
