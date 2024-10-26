import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostUserDto } from './dto/post-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserDto(user.id, user.name, user.email);
  }

  async store(payload: PostUserDto) {
    const { password, email } = payload;

    const emailExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      AppConfig().BCRYPT_SALT_ROUNDS,
    );

    payload.password = hashedPassword;

    const user = await this.prisma.user.create({ data: payload });

    return new UserDto(user.id, user.name, user.email);
  }

  async update(userId: number, user: PostUserDto) {
    return this.prisma.user.update({ where: { id: userId }, data: user });
  }

  async delete(userId: number) {
    this.prisma.user.delete({ where: { id: userId } });
  }
}
