import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { VerifyUserEmailService } from './providers/veriy-user-email.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, VerifyUserEmailService],
})
export class UserModule {}
