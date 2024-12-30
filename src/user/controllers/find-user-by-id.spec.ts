import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdController } from './find-user-by-id.controller';
import { GetUserByIdService } from '../providers/get-user-by-id.service';

const userMock = {
  id: 1,
  name: 'Test',
  email: 'email@email.com',
};

describe('FindUserByIdController', () => {
  let controller: FindUserByIdController;
  let service: GetUserByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByIdController],
      providers: [
        {
          provide: GetUserByIdService,
          useValue: {
            execute: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    controller = module.get<FindUserByIdController>(FindUserByIdController, { strict: false });
    service = module.get<GetUserByIdService>(GetUserByIdService, { strict: false });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should show a user', async () => {
    const res = await controller.show(1);

    expect(res).toEqual(userMock);

    expect(service.execute).toHaveBeenCalledWith(1);
    expect(service.execute).toHaveBeenCalledTimes(1);
    expect(service.execute).toHaveReturnedTimes(1);
  });
});
