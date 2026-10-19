import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { SetUserPasswordDto } from './dto/set-user-password.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  getOverview() {
    return this.adminService.getOverview();
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get('admins')
  getAdmins() {
    return this.adminService.getAdmins();
  }

  @Get('users/:id')
  getUserDetail(@Param('id') id: string) {
    return this.adminService.getUserDetail(id);
  }

  @Patch('users/:id/password')
  setUserPassword(@Param('id') id: string, @Body() dto: SetUserPasswordDto) {
    return this.adminService.setUserPassword(id, dto.password);
  }

  @Get('completions')
  getCompletions() {
    return this.adminService.getCompletions();
  }

  @Get('payments')
  getPayments() {
    return this.adminService.getPayments();
  }

  @Delete('enrollments/:id')
  removeEnrollment(@Param('id') id: string) {
    return this.adminService.removeEnrollment(id);
  }

  @Patch('users/:id/role')
  setUserRole(
    @Param('id') id: string,
    @Body('role') role: 'ADMIN' | 'STUDENT',
  ) {
    return this.adminService.setUserRole(id, role);
  }
}
