import { Injectable } from '@nestjs/common';
import { UserDtoPostRequest } from 'src/common/dtos/user/user-dto-post-request.dto';
import { UserDto } from 'src/common/dtos/user/user.dto';
import { ProviderInterface } from 'src/common/providers/provider.interface';
import { VerifyUserEmailService } from './veriy-user-email.service';
import { HashUserPasswordService } from './hash-user-password.service';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';

@Injectable()
export class CreateUserService implements ProviderInterface {
  constructor(
    private readonly verifyUserEmailService: VerifyUserEmailService,
    private readonly hashUserPasswordService: HashUserPasswordService,
    private readonly prismaService: PrismaService,
  ) {}

  async handle(payload: UserDtoPostRequest): Promise<UserDto> {
    const { password, email } = payload;

    await this.verifyUserEmailService.handle(email);

    payload.password = await this.hashUserPasswordService.handle(password);

    const user = await this.prismaService.user.create({ data: payload });

    return new UserDto(user.id, user.name, user.email);
  }
}
