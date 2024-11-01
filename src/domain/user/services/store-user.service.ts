import { AppConfig } from 'src/config/app.config';
import { InvalidEmailException } from 'src/domain/exceptions/invalid-email.execption';
import { PrismaService } from 'src/infrastructure/services/prisma/prisma.service';
import { UserDtoPostRequest } from 'src/presentation/dto/user-dto-post-request.dto';
import { UserDto } from 'src/presentation/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreUserService {
  constructor(private prisma: PrismaService) {}

  async handle(payload: UserDtoPostRequest) {
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
}
