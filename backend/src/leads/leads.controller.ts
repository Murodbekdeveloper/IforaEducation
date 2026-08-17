import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import type { CreateLeadDto } from './lead.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() dto: CreateLeadDto) {
    if (!dto?.phone || dto.phone.trim().length === 0) {
      throw new BadRequestException('phone is required');
    }
    const lead = await this.leadsService.create(dto);
    return { success: true, lead };
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  markContacted(
    @Param('id') id: string,
    @Body('contacted') contacted: boolean,
  ) {
    return this.leadsService.markContacted(id, contacted);
  }
}
