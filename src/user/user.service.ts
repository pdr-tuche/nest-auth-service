import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/providers/prisma/prisma.service';
import { UserDtoPostRequest } from '../common/dtos/user/user-dto-post-request.dto';
import { UserDto } from '../common/dtos/user/user.dto';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';
import { UserDtoPutRequest } from '../common/dtos/user/user-dto-put-request.dto';
import { AppConfigEnum } from 'src/common/enums/app-config.enum';
import { VerifyUserEmailService } from './providers/veriy-user-email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly verifyUserEmailService: VerifyUserEmailService,
    private readonly prismaService: PrismaService,
  ) {}

  async getUserById(id: number): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserDto(user.id, user.name, user.email);
  }

  async create(payload: UserDtoPostRequest): Promise<UserDto> {
    const { password, email } = payload;

    await this.verifyUserEmailService.handle(email);

    payload.password = await bcrypt.hash(password, AppConfigEnum.BCRYPT_SALT_ROUNDS);

    const user = await this.prismaService.user.create({ data: payload });

    return new UserDto(user.id, user.name, user.email);
  }

  async update(userId: number, payload: UserDtoPutRequest): Promise<UserDto> {
    await this.getUserById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: payload,
    });

    return new UserDto(updatedUser.id, updatedUser.name, updatedUser.email);
  }

  async delete(userId: number): Promise<void> {
    await this.getUserById(userId);

    this.prismaService.user.delete({ where: { id: userId } });
  }
}
