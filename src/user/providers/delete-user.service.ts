import { Injectable } from '@nestjs/common';
import { ProviderInterface } from 'src/common/providers/provider.interface';
import { GetUserByIdService } from './get-user-by-id.service';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

@Injectable()
export class DeleteUserService implements ProviderInterface {
  constructor(
    private readonly getUserByIdService: GetUserByIdService,
    private readonly prismaService: PrismaService,
  ) {}

  async handle(userId: number): Promise<void> {
    await this.getUserByIdService.handle(userId);

    await this.prismaService.user.delete({ where: { id: userId } });
  }
}
