import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { FindCatsDto } from './dto/find-cats.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(catDto: CreateCatDto) {
    this.cats.push({
      id: crypto.randomUUID(),
      ...catDto,
    });
  }

  findAll(findCatsDto: FindCatsDto = {}): Cat[] {
    return this.cats.slice(0, findCatsDto.limit);
  }

  findById(id: string) {
    const cat = this.cats.find((cat) => cat.id === id);

    if (!cat) {
      throw new NotFoundException('Cat by provided id is not found');
    }

    return cat;
  }

  update(id: string, updateCatDto: UpdateCatDto): Cat {
    const cat = this.findById(id);

    Object.assign(cat, updateCatDto);

    return cat;
  }

  delete(id: string): Cat[] {
    const cat = this.findById(id);

    return this.cats.splice(this.cats.indexOf(cat), 1);
  }
}
