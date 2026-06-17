import { User } from 'src/user/schemas/user.schema';
import { CreateCatDto } from '../dto/create-cat.dto';
import { FindByIdDto } from '../dto/find-by-id.dto';
import { FindCatsDto } from '../dto/find-cats.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../schemas/cat.schema';

export const CATS_REPOSITORY = Symbol();

export type CatWithId = Omit<Cat, '_id' | 'owner'> & {
  id: string;
  owner?: { id: string; login: string } | null;
};

export interface ICatsRepository {
  create(owner: User['_id'], createCatDto: CreateCatDto): Promise<CatWithId>;
  findAll(findCatsDto: FindCatsDto): Promise<CatWithId[]>;
  findById(FindByIdDto: FindByIdDto): Promise<CatWithId | null>;
  update(id: string, updateCatDto: UpdateCatDto): Promise<CatWithId>;
  delete(id: string): Promise<void>;
}
