import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../../src/cats/cats.service';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatDto } from '../../src/cats/dto/create-cat.dto';
import { FindCatsDto } from '../../src/cats/dto/find-cats.dto';
import { UpdateCatDto } from '../../src/cats/dto/update-cat.dto';
import { User } from '../../src/user/schemas/user.schema';
import {
  CATS_REPOSITORY,
  ICatsRepository,
} from '../../src/cats/repositories/cats.repository.interface';

describe('CatsService', () => {
  let service: CatsService;
  let mockCatsRepository: jest.Mocked<ICatsRepository>;

  beforeEach(async () => {
    mockCatsRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CATS_REPOSITORY,
          useValue: mockCatsRepository,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  describe('create', () => {
    it('should throw BadRequestException when owner is not provided', async () => {
      const catDto = new CreateCatDto();

      await expect(service.create('', catDto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('should call repository create method with expected params', async () => {
      const owner = 'owner-id';
      const catDto = new CreateCatDto();

      await service.create(owner, catDto);

      expect(mockCatsRepository.create).toHaveBeenCalledWith(owner, catDto);
    });
  });

  describe('findAll', () => {
    it('should call repository findAll with provided params', async () => {
      const findCatsDto = new FindCatsDto();

      await service.findAll(findCatsDto);

      expect(mockCatsRepository.findAll).toHaveBeenCalledWith(findCatsDto);
    });

    it('should call repository findAll with empty object when no params provided', async () => {
      await service.findAll();

      expect(mockCatsRepository.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('findById', () => {
    it('should return cat when found', async () => {
      const cat = {
        _id: '1',
        name: 'Fluffy',
        age: 3,
        breed: 'Persian',
        owner: { _id: 'owner-1' } as User,
      };

      mockCatsRepository.findById.mockResolvedValue(cat);

      const result = await service.findById({ id: '1' });

      expect(result).toEqual(cat);
      expect(mockCatsRepository.findById).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw NotFoundException when cat not found', async () => {
      mockCatsRepository.findById.mockResolvedValue(null);

      await expect(service.findById({ id: '1' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should call repository update after ownership check', async () => {
      const userId = 'user-1';
      const catId = 'cat-1';
      const updateDto = new UpdateCatDto();
      const mockCat = {
        _id: catId,
        name: 'Fluffy',
        age: 3,
        breed: 'Persian',
        owner: { _id: userId } as User,
      };

      mockCatsRepository.findById.mockResolvedValue(mockCat);
      mockCatsRepository.update.mockResolvedValue(mockCat);

      await service.update(userId, catId, updateDto);

      expect(mockCatsRepository.update).toHaveBeenCalledWith(catId, updateDto);
    });

    it('should throw ForbiddenException when user does not own cat', async () => {
      const mockCat = {
        _id: 'cat-1',
        name: 'Fluffy',
        age: 3,
        breed: 'Persian',
        owner: { _id: 'other-user' } as User,
      };

      mockCatsRepository.findById.mockResolvedValue(mockCat);

      await expect(
        service.update('user-1', 'cat-1', new UpdateCatDto()),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('delete', () => {
    it('should call repository delete after ownership check', async () => {
      const userId = 'user-1';
      const catId = 'cat-1';
      const mockCat = {
        _id: catId,
        name: 'Fluffy',
        age: 3,
        breed: 'Persian',
        owner: { _id: userId } as User,
      };

      mockCatsRepository.findById.mockResolvedValue(mockCat);

      await service.delete(userId, catId);

      expect(mockCatsRepository.delete).toHaveBeenCalledWith(catId);
    });

    it('should throw ForbiddenException when user does not own cat', async () => {
      const mockCat = {
        _id: 'cat-1',
        name: 'Fluffy',
        age: 3,
        breed: 'Persian',
        owner: { _id: 'other-user' } as User,
      };

      mockCatsRepository.findById.mockResolvedValue(mockCat);

      await expect(service.delete('user-1', 'cat-1')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
