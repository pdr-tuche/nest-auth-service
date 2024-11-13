import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { VerifyUserEmailService } from './providers/veriy-user-email.service';
import { GetUserByIdService } from './providers/get-user-by-id.service';
import { HashUserPasswordService } from './providers/hash-user-password.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    VerifyUserEmailService,
    GetUserByIdService,
    HashUserPasswordService,
  ],
})
export class UserModule {}
