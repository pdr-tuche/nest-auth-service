import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';
import { UserDtoPutRequest } from 'src/presentation/dto/user-dto-put-request.dto';
import { UserDto } from 'src/presentation/dto/user.dto';

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async handle(userId: number, user: UserDtoPutRequest) {
    const updateUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!updateUser) {
      throw new UserNotFoundException();
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: user,
    });

    return new UserDto(updatedUser.id, updatedUser.name, updatedUser.email);
  }
}
