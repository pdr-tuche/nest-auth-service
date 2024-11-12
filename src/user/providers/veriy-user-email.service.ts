import { Injectable } from '@nestjs/common';
import { InvalidEmailException } from 'src/common/exceptions/invalid-email.execption';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { UserProviderInterface } from './user-provider.interface';

@Injectable()
export class VerifyUserEmailService implements UserProviderInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async handle(email: string): Promise<string> {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new InvalidEmailException();
    }

    return email;
  }
}
