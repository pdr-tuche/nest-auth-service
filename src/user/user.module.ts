import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { VerifyUserEmailService } from './providers/veriy-user-email.service';
import { GetUserByIdService } from './providers/get-user-by-id.service';
import { HashUserPasswordService } from './providers/hash-user-password.service';
import { CreateUserService } from './providers/create-user.service';
import { UpdateUserService } from './providers/update-user.service';
import { DeleteUserService } from './providers/delete-user.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    DeleteUserService,
    GetUserByIdService,
    HashUserPasswordService,
    UpdateUserService,
    VerifyUserEmailService,
    PrismaService,
  ],
})
export class UserModule {}
