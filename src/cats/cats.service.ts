import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { FindCatsDto } from './dto/find-cats.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import {
  CATS_REPOSITORY,
  ICatsRepository,
} from './repositories/cats.repository.interface';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class CatsService {
  constructor(
    @Inject(CATS_REPOSITORY) private catsRepository: ICatsRepository,
  ) {}

  create(owner: string, catDto: CreateCatDto) {
    if (!owner) {
      throw new BadRequestException(['Owner was not provided']);
    }

    this.catsRepository.create(owner, catDto);
  }

  async findAll(findCatsDto: FindCatsDto = {}) {
    return await this.catsRepository.findAll(findCatsDto);
  }

  async findById({ id }: FindByIdDto) {
    const cat = await this.catsRepository.findById({ id });

    if (!cat) {
      throw new NotFoundException(['Cat by provided id is not found']);
    }

    return cat;
  }

  async update(userId: string, id: string, updateCatDto: UpdateCatDto) {
    await this.doesUserIdOwnCat(userId, id);

    const updatedCat = await this.catsRepository.update(id, updateCatDto);

    return updatedCat;
  }

  async delete(userId: string, id: string) {
    await this.doesUserIdOwnCat(userId, id);

    await this.catsRepository.delete(id);
  }

  private async doesUserIdOwnCat(userId: string, id) {
    // Checks if cat exists, throws an exception if doesn't
    const cat = await this.findById({ id });

    // TODO: Come up with a better way to cast
    const owner = cat.owner as User;

    if (owner.id.toString() !== userId) {
      throw new ForbiddenException(['The current user does not own this cat']);
    }
  }
}
