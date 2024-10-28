import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDtoPostRequest } from './dto/user-dto-post-request.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AppConfig } from 'src/config/app.config';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { InvalidEmailException } from 'src/exceptions/invalid-email.execption';
import { UserDtoPutRequest } from './dto/user-dto-put-request.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserDto(user.id, user.name, user.email);
  }

  async store(payload: UserDtoPostRequest) {
    const { password, email } = payload;

    const emailExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new InvalidEmailException();
    }

    payload.password = await bcrypt.hash(
      password,
      AppConfig().BCRYPT_SALT_ROUNDS,
    );

    const user = await this.prisma.user.create({ data: payload });

    return new UserDto(user.id, user.name, user.email);
  }

  async update(userId: number, user: UserDtoPutRequest) {
    const updateUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!updateUser) {
      throw new UserNotFoundException();
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: user,
    });

    return new UserDto(updatedUser.id, updatedUser.name, updatedUser.email);
  }

  async delete(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    this.prisma.user.delete({ where: { id: userId } });
  }
}
