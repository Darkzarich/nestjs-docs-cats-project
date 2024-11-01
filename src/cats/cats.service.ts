import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { FindCatsDto } from './dto/find-cats.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import {
  CATS_REPOSITORY,
  ICatsRepository,
} from './repositories/cats.repository.interface';

@Injectable()
export class CatsService {
  constructor(
    @Inject(CATS_REPOSITORY) private catsRepository: ICatsRepository,
  ) {}

  create(catDto: CreateCatDto) {
    this.catsRepository.create(catDto);
  }

  async findAll(findCatsDto: FindCatsDto = {}) {
    return await this.catsRepository.findAll(findCatsDto);
  }

  async findById({ id }: FindByIdDto) {
    const cat = await this.catsRepository.findById({ id });

    if (!cat) {
      throw new NotFoundException('Cat by provided id is not found');
    }

    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const updatedCat = await this.catsRepository.update(id, updateCatDto);

    return updatedCat;
  }

  async delete(id: string) {
    // Check if cat exists
    this.findById({ id });

    await this.catsRepository.delete(id);
  }
}
