import { Injectable } from '@nestjs/common';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../schemas/cat.schema';
import { ICatsRepository } from './cats.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindByIdDto } from '../dto/find-by-id.dto';
import { FindCatsDto } from '../dto/find-cats.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class MongoCatsRepository implements ICatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(owner: User['id'], cat: Cat) {
    const newCat = await this.catModel.create({
      owner,
      ...cat,
    });

    return newCat.toJSON();
  }
  async findAll({ limit }: FindCatsDto) {
    const cats = await this.catModel
      .find()
      .populate('owner', { id: 1, login: 1 })
      .limit(limit);

    return cats.map((cat) => cat.toJSON());
  }
  async findById({ id }: FindByIdDto) {
    const cat = await this.catModel
      .findById(id)
      .populate('owner', { id: 1, login: 1 });

    return cat.toJSON();
  }
  async update(id: string, updateCatDto: UpdateCatDto) {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
    });

    return updatedCat.toJSON();
  }
  async delete(id: string) {
    await this.catModel.findByIdAndDelete(id);
  }
}
