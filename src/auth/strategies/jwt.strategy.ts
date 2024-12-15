import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfig } from 'src/config/app/app.config';
import { JwtPayloadDto } from 'src/common/dtos/auth/jwt-payload.dto';
import { UserDto } from 'src/common/dtos/user/user.dto';
import { validateOrReject, ValidationError } from 'class-validator';
import { ExceptionMessageEnum } from 'src/common/enums/exception-message.enum';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AppConfig().JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto) {
    const jwtPayload = Object.assign(new JwtPayloadDto(), payload);
    try {
      await validateOrReject(jwtPayload);
    } catch (errors: unknown) {
      if (
        errors instanceof Array &&
        errors.every((validation) => validation instanceof ValidationError)
      ) {
        throw new UnauthorizedException(ExceptionMessageEnum.INVALID_JWT_PAYLOAD, {
          cause: errors,
        });
      }
      throw errors;
    }

    return new UserDto(payload.sub, payload.name, payload.username);
  }
}
