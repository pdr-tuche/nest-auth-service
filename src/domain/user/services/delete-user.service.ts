import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async handle(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.prisma.user.delete({ where: { id: userId } });
  }
}
