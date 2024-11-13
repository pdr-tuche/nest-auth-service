import { Injectable } from '@nestjs/common';
import { ProviderInterface } from '../../common/providers/provider.interface';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UserDto } from 'src/common/dtos/user/user.dto';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';

@Injectable()
export class GetUserByIdService implements ProviderInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async handle(id: number): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserDto(user.id, user.name, user.email);
  }
}
