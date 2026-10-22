import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLiveSessionDto } from './dto/create-live-session.dto';
import { UpdateLiveSessionDto } from './dto/update-live-session.dto';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ResolveSpeakRequestDto } from './dto/resolve-speak-request.dto';
import {
  LiveChatMessageView,
  LiveSessionView,
  LiveSpeakRequestView,
} from './live.types';

@Injectable()
export class LiveService {
  private readonly logger = new Logger(LiveService.name);

  constructor(private readonly prisma: PrismaService) {}

  private toSessionView(row: {
    id: string;
    title: string;
    description: string | null;
    youtubeVideoId: string | null;
    status: string;
    scheduledAt: Date;
    startedAt: Date | null;
    endedAt: Date | null;
  }): LiveSessionView {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      youtubeVideoId: row.youtubeVideoId,
      status: row.status as LiveSessionView['status'],
      scheduledAt: row.scheduledAt.toISOString(),
      startedAt: row.startedAt ? row.startedAt.toISOString() : null,
      endedAt: row.endedAt ? row.endedAt.toISOString() : null,
    };
  }

  private toMessageView(row: {
    id: string;
    message: string;
    createdAt: Date;
    userId: string;
    user: { firstName: string; lastName: string; avatarInitial: string };
  }): LiveChatMessageView {
    return {
      id: row.id,
      message: row.message,
      createdAt: row.createdAt.toISOString(),
      userId: row.userId,
      authorName: `${row.user.firstName} ${row.user.lastName}`,
      authorInitial: row.user.avatarInitial,
    };
  }

  private toSpeakRequestView(row: {
    id: string;
    status: string;
    createdAt: Date;
    resolvedAt: Date | null;
    userId: string;
    user: {
      firstName: string;
      lastName: string;
      avatarInitial: string;
      phone: string;
    };
  }): LiveSpeakRequestView {
    return {
      id: row.id,
      status: row.status as LiveSpeakRequestView['status'],
      createdAt: row.createdAt.toISOString(),
      resolvedAt: row.resolvedAt ? row.resolvedAt.toISOString() : null,
      userId: row.userId,
      authorName: `${row.user.firstName} ${row.user.lastName}`,
      authorInitial: row.user.avatarInitial,
      authorPhone: row.user.phone,
    };
  }

  async getCurrent(): Promise<LiveSessionView | null> {
    const live = await this.prisma.liveSession.findFirst({
      where: { status: 'LIVE' },
      orderBy: { startedAt: 'desc' },
    });
    if (live) return this.toSessionView(live);

    const upcoming = await this.prisma.liveSession.findFirst({
      where: { status: 'SCHEDULED' },
      orderBy: { scheduledAt: 'asc' },
    });
    if (upcoming) return this.toSessionView(upcoming);

    return null;
  }

  async listAll(): Promise<LiveSessionView[]> {
    const rows = await this.prisma.liveSession.findMany({
      orderBy: { scheduledAt: 'desc' },
    });
    return rows.map((row) => this.toSessionView(row));
  }

  async create(dto: CreateLiveSessionDto): Promise<LiveSessionView> {
    const row = await this.prisma.liveSession.create({
      data: {
        title: dto.title,
        description: dto.description,
        youtubeVideoId: dto.youtubeVideoId,
        scheduledAt: new Date(dto.scheduledAt),
      },
    });
    return this.toSessionView(row);
  }

  async update(
    id: string,
    dto: UpdateLiveSessionDto,
  ): Promise<LiveSessionView> {
    const existing = await this.prisma.liveSession.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Efir topilmadi.');

    const timestampPatch: { startedAt?: Date; endedAt?: Date } = {};
    if (dto.status === 'LIVE' && existing.status !== 'LIVE') {
      timestampPatch.startedAt = new Date();
    }
    if (dto.status === 'ENDED' && existing.status !== 'ENDED') {
      timestampPatch.endedAt = new Date();
    }

    const row = await this.prisma.liveSession.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description }
          : {}),
        ...(dto.youtubeVideoId !== undefined
          ? { youtubeVideoId: dto.youtubeVideoId }
          : {}),
        ...(dto.scheduledAt !== undefined
          ? { scheduledAt: new Date(dto.scheduledAt) }
          : {}),
        ...(dto.status !== undefined ? { status: dto.status } : {}),
        ...timestampPatch,
      },
    });
    return this.toSessionView(row);
  }

  async getMessages(sessionId: string): Promise<LiveChatMessageView[]> {
    const rows = await this.prisma.liveChatMessage.findMany({
      where: { liveSessionId: sessionId },
      orderBy: { createdAt: 'asc' },
      take: 200,
      include: {
        user: {
          select: { firstName: true, lastName: true, avatarInitial: true },
        },
      },
    });
    return rows.map((row) => this.toMessageView(row));
  }

  async addMessage(
    sessionId: string,
    userId: string,
    dto: CreateChatMessageDto,
  ): Promise<LiveChatMessageView> {
    const session = await this.prisma.liveSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Efir topilmadi.');

    const row = await this.prisma.liveChatMessage.create({
      data: { liveSessionId: sessionId, userId, message: dto.message },
      include: {
        user: {
          select: { firstName: true, lastName: true, avatarInitial: true },
        },
      },
    });
    return this.toMessageView(row);
  }

  async requestToSpeak(
    sessionId: string,
    userId: string,
  ): Promise<LiveSpeakRequestView> {
    const session = await this.prisma.liveSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new NotFoundException('Efir topilmadi.');

    const row = await this.prisma.liveSpeakRequest.upsert({
      where: { liveSessionId_userId: { liveSessionId: sessionId, userId } },
      update: {},
      create: { liveSessionId: sessionId, userId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatarInitial: true,
            phone: true,
          },
        },
      },
    });
    return this.toSpeakRequestView(row);
  }

  async getMySpeakRequest(
    sessionId: string,
    userId: string,
  ): Promise<LiveSpeakRequestView | null> {
    const row = await this.prisma.liveSpeakRequest.findUnique({
      where: { liveSessionId_userId: { liveSessionId: sessionId, userId } },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatarInitial: true,
            phone: true,
          },
        },
      },
    });
    return row ? this.toSpeakRequestView(row) : null;
  }

  async listSpeakRequests(sessionId: string): Promise<LiveSpeakRequestView[]> {
    const rows = await this.prisma.liveSpeakRequest.findMany({
      where: { liveSessionId: sessionId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatarInitial: true,
            phone: true,
          },
        },
      },
    });
    return rows.map((row) => this.toSpeakRequestView(row));
  }

  async resolveSpeakRequest(
    requestId: string,
    dto: ResolveSpeakRequestDto,
  ): Promise<LiveSpeakRequestView> {
    const existing = await this.prisma.liveSpeakRequest.findUnique({
      where: { id: requestId },
    });
    if (!existing) throw new NotFoundException('Soʻrov topilmadi.');

    const row = await this.prisma.liveSpeakRequest.update({
      where: { id: requestId },
      data: { status: dto.status, resolvedAt: new Date() },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatarInitial: true,
            phone: true,
          },
        },
      },
    });
    return this.toSpeakRequestView(row);
  }
}
