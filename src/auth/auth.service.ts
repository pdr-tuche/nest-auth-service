import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({where: {id: userId}})
  }
}
