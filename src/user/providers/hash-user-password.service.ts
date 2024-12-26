import { Injectable } from '@nestjs/common';
import { ProviderInterface } from '../../common/providers/provider.interface';
import * as bcrypt from 'bcrypt';
import { AppConfig } from '../../config/app/app.config';

@Injectable()
export class HashUserPasswordService implements ProviderInterface {
  async execute(password: string): Promise<string> {
    return await bcrypt.hash(password, AppConfig().BCRYPT_SALT_ROUNDS);
  }
}
