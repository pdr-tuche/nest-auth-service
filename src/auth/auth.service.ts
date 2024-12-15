import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from 'src/common/dtos/auth/auth.dto';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/common/dtos/user/user.dto';
import { ExceptionMessageEnum } from 'src/common/enums/exception-message.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  protected async validateUser({ email, password }: AuthPayloadDto): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(ExceptionMessageEnum.INVALID_CREDENTIALS);
    }

    return new UserDto(user.id, user.name, user.email);
  }

  async signIn(data: AuthPayloadDto) {
    const user = await this.validateUser(data);

    //todo: melhorar isso de passar id e email no jwt
    // sugestao: utilizar username sem ser email
    //todo: adicionar roles no jwt
    const payload = { sub: user.getId(), name: user.getName(), username: user.getEmail() };
    return this.jwtService.signAsync(payload);
  }
}
