import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { ProviderInterface } from '../../common/providers/provider.interface';
import { ExceptionMessageEnum } from 'src/common/enums/exception-message.enum';

@Injectable()
export class VerifyUserEmailService implements ProviderInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async handle(email: string): Promise<string> {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new BadRequestException(ExceptionMessageEnum.INVALID_EMAIL);
    }

    return email;
  }
}
