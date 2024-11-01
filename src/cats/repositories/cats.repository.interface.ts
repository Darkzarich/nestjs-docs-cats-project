import { CreateCatDto } from '../dto/create-cat.dto';
import { FindByIdDto } from '../dto/find-by-id.dto';
import { FindCatsDto } from '../dto/find-cats.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../schemas/cat.schema';

export const CATS_REPOSITORY = Symbol('CatsRepository');

export interface ICatsRepository {
  create(createCatDto: CreateCatDto): Promise<Cat>;
  findAll(findCatsDto: FindCatsDto): Promise<Cat[]>;
  findById(FindByIdDto: FindByIdDto): Promise<Cat | null>;
  update(id: string, updateCatDto: UpdateCatDto): Promise<Cat>;
  delete(id: string): Promise<void>;
}
