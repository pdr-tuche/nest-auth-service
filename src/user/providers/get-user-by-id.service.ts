import { Injectable, NotFoundException } from '@nestjs/common';
import { ProviderInterface } from '../../common/providers/provider.interface';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UserDto } from 'src/common/dtos/user/user.dto';
import { ExceptionMessageEnum } from 'src/common/enums/exception-message.enum';

@Injectable()
export class GetUserByIdService implements ProviderInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: number): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(ExceptionMessageEnum.USER_NOT_FOUND);
    }

    return new UserDto(user.id, user.name, user.email);
  }
}
