import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserController } from './update-user.controller';
import { UpdateUserService } from '../providers/update-user.service';
import { UserDtoPutRequest } from 'src/common/dtos/user/user-dto-put-request.dto';

const userUpdatedMock = {
  id: 1,
  name: 'Fulano',
  email: 'email@email.com',
};

describe('UpdateUserController (update name)', () => {
  let controller: UpdateUserController;
  let service: UpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [
        {
          provide: UpdateUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(userUpdatedMock),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateUserController>(UpdateUserController, { strict: false });
    service = module.get<UpdateUserService>(UpdateUserService, { strict: false });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should update user', async () => {
    const res = await controller.update(1, { name: 'Fulano' } as unknown as UserDtoPutRequest);

    expect(res).toEqual(userUpdatedMock);

    expect(service.execute).toHaveBeenCalledTimes(1);
    expect(service.execute).toHaveReturnedTimes(1);
  });
});
