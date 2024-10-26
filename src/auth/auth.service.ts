import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostUserDto } from './dto/post-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AppConfig } from 'src/config/app.config';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { InvalidEmailException } from 'src/exceptions/invalid-email.execption';

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

  async store(payload: PostUserDto) {
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

  async update(userId: number, user: PostUserDto) {
    return this.prisma.user.update({ where: { id: userId }, data: user });
  }

  async delete(userId: number) {
    this.prisma.user.delete({ where: { id: userId } });
  }
}
