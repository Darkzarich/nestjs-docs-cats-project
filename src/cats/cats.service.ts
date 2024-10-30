import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
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

  findAll(findCatsDto: FindCatsDto = {}): Cat[] {
    return this.catsRepository.findAll(findCatsDto);
  }

  findById({ id }: FindByIdDto): Cat {
    const cat = this.catsRepository.findById({ id });

    if (!cat) {
      throw new NotFoundException('Cat by provided id is not found');
    }

    return cat;
  }

  update(id: string, updateCatDto: UpdateCatDto): Cat {
    const cat = this.findById({ id });

    Object.assign(cat, updateCatDto);

    return cat;
  }

  delete(id: string) {
    // Check if cat exists
    this.findById({ id });

    this.catsRepository.delete(id);
  }
}
