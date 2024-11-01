import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/services/prisma/prisma.service';
import { ShowUserAction } from 'src/domain/user/http/show-user.action';
import { GetUserByIdService } from './services/get-by-id.service';
import { StoreUserService } from './services/store-user.service';
import { CreateUserAction } from './http/create-user.action';
import { UpdateUserService } from './services/update-user.service';
import { UpdateUserAction } from './http/update-user.action';
import { DeleteUserService } from './services/delete-user.service';
import { DeleteUserAction } from './http/delete-user.action';

@Module({
  controllers: [
    ShowUserAction,
    CreateUserAction,
    UpdateUserAction,
    DeleteUserAction,
  ],
  providers: [
    PrismaService,
    GetUserByIdService,
    StoreUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
