import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostUserDto } from './dto/post-user.dto';
import { UserDto } from './dto/user.dto';

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

  async create(userDto: PostUserDto) {
    const user = await this.prisma.user.create({ data: userDto });

    return new UserDto(user.id, user.name, user.email);
  }

  async update(userId: number, user: PostUserDto) {
    return this.prisma.user.update({ where: { id: userId }, data: user });
  }

  async delete(userId: number) {
    this.prisma.user.delete({ where: { id: userId } });
  }
}
