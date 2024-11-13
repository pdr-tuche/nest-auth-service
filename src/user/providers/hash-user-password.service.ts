import { Injectable } from '@nestjs/common';
import { ProviderInterface } from '../../common/providers/provider.interface';
import * as bcrypt from 'bcrypt';
import { AppConfigEnum } from 'src/common/enums/app-config.enum';

@Injectable()
export class HashUserPasswordService implements ProviderInterface {
  async handle(password: string): Promise<string> {
    return await bcrypt.hash(password, AppConfigEnum.BCRYPT_SALT_ROUNDS);
  }
}
