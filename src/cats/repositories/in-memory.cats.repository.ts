import { Injectable } from '@nestjs/common';
import { Cat } from 'client/src/types';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { ICatsRepository } from './cats.repository.interface';
import { FindCatsDto } from '../dto/find-cats.dto';
import { FindByIdDto } from '../dto/find-by-id.dto';
import { CreateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class InMemoryCatsRepository implements ICatsRepository {
  private readonly cats: Cat[] = [];

  async create(cat: CreateCatDto) {
    const newCat = {
      id: crypto.randomUUID(),
      ...cat,
    };

    this.cats.push(newCat);

    return newCat;
  }

  async findAll({ limit }: FindCatsDto) {
    return this.cats.slice(0, limit);
  }

  async findById({ id }: FindByIdDto) {
    const cat = this.cats.find((cat) => cat.id === id);

    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const cat = this.findById({ id });

    Object.assign(cat, updateCatDto);

    return cat;
  }

  async delete(id: string) {
    const cat = await this.findById({ id });

    this.cats.splice(this.cats.indexOf(cat), 1);
  }
}
