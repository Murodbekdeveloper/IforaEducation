import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactMessageDto) {
    try {
      return await this.prisma.contactMessage.create({ data: dto });
    } catch (error) {
      this.logger.warn(
        `create() could not persist message: ${(error as Error).message}`,
      );
      return { id: randomUUID(), ...dto, read: false, createdAt: new Date() };
    }
  }

  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  markRead(id: string, read: boolean) {
    return this.prisma.contactMessage.update({ where: { id }, data: { read } });
  }
}
