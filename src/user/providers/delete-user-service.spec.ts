import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from './delete-user.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { UserDto } from '../../common/dtos/user/user.dto';
import { PrismaService } from '../../common/providers/prisma/prisma.service';

describe('DeleteUserService', () => {
  let service: DeleteUserService;
  let getUserByIdService: GetUserByIdService;
  let prismaService: PrismaService;

  const userMock = {
    id: 1,
    name: 'Test',
    email: 'test@test.com',
  } as unknown as UserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: GetUserByIdService,
          useValue: {
            execute: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService, { strict: false });
    getUserByIdService = module.get<GetUserByIdService>(GetUserByIdService, {
      strict: false,
    });
    prismaService = module.get<PrismaService>(PrismaService, { strict: false });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(getUserByIdService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should delete user', async () => {
    await service.execute(1);

    expect(getUserByIdService.execute).toHaveBeenCalledWith(1);
    expect(getUserByIdService.execute).toHaveBeenCalledTimes(1);
    expect(getUserByIdService.execute).toHaveReturnedTimes(1);

    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
    expect(prismaService.user.delete).toHaveReturnedTimes(1);
  });
});
