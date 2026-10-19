import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LiveService } from './live.service';
import { CreateLiveSessionDto } from './dto/create-live-session.dto';
import { UpdateLiveSessionDto } from './dto/update-live-session.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ResolveSpeakRequestDto } from './dto/resolve-speak-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/auth.types';

@UseGuards(JwtAuthGuard)
@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get('current')
  getCurrent() {
    return this.liveService.getCurrent();
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.liveService.getMessages(id);
  }

  @Post(':id/messages')
  addMessage(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateChatMessageDto,
  ) {
    return this.liveService.addMessage(id, user.id, dto);
  }

  @Post(':id/speak-requests')
  requestToSpeak(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.liveService.requestToSpeak(id, user.id);
  }

  @Get(':id/speak-requests/me')
  getMySpeakRequest(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.liveService.getMySpeakRequest(id, user.id);
  }

  @UseGuards(AdminGuard)
  @Get()
  listAll() {
    return this.liveService.listAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() dto: CreateLiveSessionDto) {
    return this.liveService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLiveSessionDto) {
    return this.liveService.update(id, dto);
  }

  @UseGuards(AdminGuard)
  @Get(':id/speak-requests')
  listSpeakRequests(@Param('id') id: string) {
    return this.liveService.listSpeakRequests(id);
  }

  @UseGuards(AdminGuard)
  @Patch('speak-requests/:requestId')
  resolveSpeakRequest(
    @Param('requestId') requestId: string,
    @Body() dto: ResolveSpeakRequestDto,
  ) {
    return this.liveService.resolveSpeakRequest(requestId, dto);
  }
}
