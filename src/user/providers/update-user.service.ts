import { Injectable } from '@nestjs/common';
import { ProviderInterface } from 'src/common/providers/provider.interface';
import { GetUserByIdService } from './get-user-by-id.service';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UserDtoPutRequest } from 'src/common/dtos/user/user-dto-put-request.dto';
import { UserDto } from 'src/common/dtos/user/user.dto';

@Injectable()
export class UpdateUserService implements ProviderInterface {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly prismaService: PrismaService,
  ) {}

  async handle(userId: number, payload: UserDtoPutRequest): Promise<UserDto> {
    await this.getUserByIdService.handle(userId);

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: payload,
    });

    return new UserDto(updatedUser.id, updatedUser.name, updatedUser.email);
  }
}
