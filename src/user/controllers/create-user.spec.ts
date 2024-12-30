import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './create-user.controller';
import { UserDto } from '../../common/dtos/user/user.dto';
import { CreateUserService } from '../providers/create-user.service';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let createUserService: CreateUserService;

  const requestPayloadMock = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
  };

  const responsePayloadMock = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
  } as unknown as UserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(responsePayloadMock),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController, { strict: false });
    createUserService = module.get<CreateUserService>(CreateUserService, { strict: false });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(createUserService).toBeDefined();
  });

  it('should return UserDto successfully', async () => {
    //act
    const result = await controller.store(requestPayloadMock);
    //assert
    expect(result).toEqual(responsePayloadMock);
    expect(typeof result).toEqual('object');
    expect(createUserService.execute).toHaveBeenCalledTimes(1);
  });
});
