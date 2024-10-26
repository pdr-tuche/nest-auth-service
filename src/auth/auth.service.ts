import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostUserDto } from './dto/post-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async create(user: PostUserDto) {
    return this.prisma.user.create({ data: user });
  }

  async update(userId: number, user: PostUserDto) {
    return this.prisma.user.update({ where: { id: userId }, data: user });
  }

  async delete(userId: number) {
    this.prisma.user.delete({ where: { id: userId } });
  }
}
