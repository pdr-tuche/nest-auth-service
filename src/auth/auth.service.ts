import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostUserDto } from './dto/post-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async createUser(user: PostUserDto) {
    console.log(user);
    return this.prisma.user.create({ data: user });
  }
}
