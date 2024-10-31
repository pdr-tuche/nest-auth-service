import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/services/prisma/prisma.service';
import { UserDtoPostRequest } from '../../presentation/dto/user-dto-post-request.dto';
import { UserDto } from '../../presentation/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AppConfig } from 'src/config/app.config';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import { InvalidEmailException } from 'src/domain/exceptions/invalid-email.execption';
import { UserDtoPutRequest } from '../../presentation/dto/user-dto-put-request.dto';

@Injectable()
export class UserService {
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

    await this.prisma.user.delete({ where: { id: userId } });
  }
}
