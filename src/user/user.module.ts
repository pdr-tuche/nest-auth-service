import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/providers/prisma/prisma.service';
import { VerifyUserEmailService } from './providers/veriy-user-email.service';
import { GetUserByIdService } from './providers/get-user-by-id.service';
import { HashUserPasswordService } from './providers/hash-user-password.service';
import { CreateUserService } from './providers/create-user.service';
import { UpdateUserService } from './providers/update-user.service';
import { DeleteUserService } from './providers/delete-user.service';
import { FindUserByIdController } from './controllers/find-user-by-id.controller';
import { CreateUserController } from './controllers/create-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';

@Module({
  controllers: [
    FindUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
  ],
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
