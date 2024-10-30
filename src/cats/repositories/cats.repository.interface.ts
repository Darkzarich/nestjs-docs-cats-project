import { CreateCatDto } from '../dto/create-cat.dto';
import { FindByIdDto } from '../dto/find-by-id.dto';
import { FindCatsDto } from '../dto/find-cats.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../interfaces/cat.interface';

export const CATS_REPOSITORY = Symbol('CatsRepository');

export interface ICatsRepository {
  create(createCatDto: CreateCatDto): Cat;
  findAll(findCatsDto: FindCatsDto): Cat[];
  findById(FindByIdDto: FindByIdDto): Cat;
  update(id: string, updateCatDto: UpdateCatDto): Cat;
  delete(id: string): void;
}
