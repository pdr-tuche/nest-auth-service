import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/services/prisma/prisma.service';
import { UserDtoPostRequest } from './dto/user-dto-post-request.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { InvalidEmailException } from 'src/exceptions/invalid-email.execption';
import { UserDtoPutRequest } from './dto/user-dto-put-request.dto';
import { AppConfigEnum } from 'src/enums/app-config.enum';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUserById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserDto(user.id, user.name, user.email);
  }

  async create(payload: UserDtoPostRequest) {
    const { password, email } = payload;

    const emailExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new InvalidEmailException();
    }

    payload.password = await bcrypt.hash(
      password,
      AppConfigEnum.BCRYPT_SALT_ROUNDS,
    );

    const user = await this.prismaService.user.create({ data: payload });

    return new UserDto(user.id, user.name, user.email);
  }

  async update(userId: number, user: UserDtoPutRequest) {
    const updateUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!updateUser) {
      throw new UserNotFoundException();
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: user,
    });

    return new UserDto(updatedUser.id, updatedUser.name, updatedUser.email);
  }

  async delete(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    this.prismaService.user.delete({ where: { id: userId } });
  }
}
