import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/providers/prisma/prisma.service';
import { UserDtoPostRequest } from '../common/dtos/user/user-dto-post-request.dto';
import { UserDto } from '../common/dtos/user/user.dto';
import { UserDtoPutRequest } from '../common/dtos/user/user-dto-put-request.dto';
import { VerifyUserEmailService } from './providers/veriy-user-email.service';
import { GetUserByIdService } from './providers/get-user-by-id.service';
import { HashUserPasswordService } from './providers/hash-user-password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly verifyUserEmailService: VerifyUserEmailService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly hashUserPasswordService: HashUserPasswordService,
    private readonly prismaService: PrismaService,
  ) {}

  async getUserById(id: number): Promise<UserDto> {
    return await this.getUserByIdService.handle(id);
  }

  async create(payload: UserDtoPostRequest): Promise<UserDto> {
    const { password, email } = payload;

    await this.verifyUserEmailService.handle(email);

    payload.password = await this.hashUserPasswordService.handle(password);

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
