import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/providers/prisma/prisma.service';
import { CreateUserService } from './create-user.service';
import { HashUserPasswordService } from './hash-user-password.service';
import { VerifyUserEmailService } from './veriy-user-email.service';

const payloadMock = {
  name: 'John Doe',
  email: 'john@email.com',
  password: 'password',
};

const userCreatedMock = {
  id: 1,
  name: 'John Doe',
  email: 'john@email.com',
};

const hashedPasswordMock = 'hashedPassword';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let verifyUserEmailService: VerifyUserEmailService;
  let hashUserPasswordService: HashUserPasswordService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: VerifyUserEmailService,
          useValue: {
            execute: jest.fn().mockResolvedValue(userCreatedMock.email),
          },
        },
        {
          provide: HashUserPasswordService,
          useValue: {
            execute: jest.fn().mockResolvedValue(hashedPasswordMock),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue(userCreatedMock),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService, { strict: false });
    verifyUserEmailService = module.get<VerifyUserEmailService>(VerifyUserEmailService, {
      strict: false,
    });
    hashUserPasswordService = module.get<HashUserPasswordService>(HashUserPasswordService, {
      strict: false,
    });
    prismaService = module.get<PrismaService>(PrismaService, { strict: false });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(verifyUserEmailService).toBeDefined();
    expect(hashUserPasswordService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should create a user', async () => {
    const res = await service.execute(payloadMock);

    expect(verifyUserEmailService.execute).toHaveBeenCalledTimes(1);
    expect(verifyUserEmailService.execute).toHaveReturnedTimes(1);

    const hashedPassword = await hashUserPasswordService.execute(payloadMock.password);
    expect(hashUserPasswordService.execute).toHaveBeenCalledTimes(1);
    expect(hashUserPasswordService.execute).toHaveReturnedTimes(1);
    expect(hashedPassword).toEqual(hashedPasswordMock);
    expect(hashedPassword).toBe(typeof 'string');

    expect(prismaService.user.create).toHaveBeenCalledTimes(1);
    expect(prismaService.user.create).toHaveReturnedTimes(1);

    expect(res).toEqual(userCreatedMock);
  });
});
