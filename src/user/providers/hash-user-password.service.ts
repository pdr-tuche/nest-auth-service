import { Injectable } from '@nestjs/common';
import { ProviderInterface } from '../../common/providers/provider.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashUserPasswordService implements ProviderInterface {
  constructor(private readonly configService: ConfigService) {}

  async execute(password: string): Promise<string> {
    return await bcrypt.hash(password, this.configService.get<number>('BCRYPT_SALT_ROUNDS'));
  }
}
