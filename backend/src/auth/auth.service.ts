import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResult, AuthUser } from './auth.types';

function normalizePhone(phone: string): string {
  return `+998${phone.replace(/\D/g, '').replace(/^998/, '')}`;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResult> {
    const phone = normalizePhone(dto.phone);

    const existing = await this.prisma.user.findUnique({ where: { phone } });
    if (existing) {
      throw new BadRequestException(
        'Bu telefon raqam bilan hisob allaqachon mavjud.',
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone,
        email: dto.email,
        passwordHash,
        avatarInitial: dto.firstName[0].toUpperCase(),
      },
    });

    return this.buildResult(user);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const phone = normalizePhone(dto.phone);
    const user = await this.prisma.user.findUnique({ where: { phone } });

    if (!user?.passwordHash) {
      throw new UnauthorizedException('Telefon raqam yoki parol notoʻgʻri.');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Telefon raqam yoki parol notoʻgʻri.');
    }

    return this.buildResult(user);
  }

  async validateUserById(id: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toAuthUser(user) : null;
  }

  private buildResult(user: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    avatarInitial: string;
    role: string;
  }): AuthResult {
    const authUser = this.toAuthUser(user);
    const token = this.jwt.sign({ sub: user.id });
    return { token, user: authUser };
  }

  private toAuthUser(user: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
    avatarInitial: string;
    role: string;
  }): AuthUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      avatarInitial: user.avatarInitial,
      role: user.role as AuthUser['role'],
    };
  }
}
