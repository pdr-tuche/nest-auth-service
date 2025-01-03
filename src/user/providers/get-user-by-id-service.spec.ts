import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/providers/prisma/prisma.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionMessageEnum } from '../../common/enums/exception-message.enum';

describe('GetUserByIdService', () => {
  let service: GetUserByIdService;
  let prismaService: PrismaService;

  const userMock = {
    id: 1,
    name: 'Test',
    email: 'test@test.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(userMock),
            },
          },
        },
      ],
    }).compile();

    service = module.get<GetUserByIdService>(GetUserByIdService, { strict: false });
    prismaService = module.get<PrismaService>(PrismaService, { strict: false });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should get user by id', async () => {
    const user = await service.execute(1);

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findUnique).toHaveReturnedTimes(1);

    expect(user).toEqual(userMock);
  });

  it('should throw not found exception', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    try {
      await service.execute(1);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toBe(ExceptionMessageEnum.USER_NOT_FOUND);
    }
  });
});
