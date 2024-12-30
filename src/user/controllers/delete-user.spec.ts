import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from '../providers/delete-user.service';
import { DeleteUserController } from './delete-user.controller';

describe('DeleteUserController', () => {
  let controller: DeleteUserController;
  let service: DeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
      providers: [
        {
          provide: DeleteUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<DeleteUserController>(DeleteUserController, { strict: false });
    service = module.get<DeleteUserService>(DeleteUserService, { strict: false });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should delete a user', async () => {
    const id = 1;
    const res = await controller.destroy(id);

    expect(service.execute).toHaveBeenCalledWith(id);
    expect(service.execute).toHaveBeenCalledTimes(1);
    expect(service.execute).toHaveReturnedTimes(1);

    expect(res).toEqual(null);
  });
});
