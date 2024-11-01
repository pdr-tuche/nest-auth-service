import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';
import { UserDto } from 'src/presentation/dto/user.dto';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async handle(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserDto(user.id, user.name, user.email);
  }
}
