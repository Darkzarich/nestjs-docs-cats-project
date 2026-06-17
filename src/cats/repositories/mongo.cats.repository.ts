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

  async create(owner: User['_id'], cat: Cat) {
    const newCat = await this.catModel.create({
      owner,
      ...cat,
    });

    return {
      ...newCat,
      // TODO: Fix wrong login
      owner: { id: owner, login: owner },
      id: newCat._id,
    };
  }
  async findAll({ limit }: FindCatsDto) {
    const cats = await this.catModel
      .find()
      .populate<{
        owner: { _id: string; login: string };
      }>('owner', { login: 1 })
      .limit(limit)
      .lean();

    return cats.map((cat) => ({
      ...cat,
      id: cat._id,
      owner: cat.owner ? { id: cat.owner._id, login: cat.owner.login } : null,
    }));
  }
  async findById({ id }: FindByIdDto) {
    const cat = await this.catModel
      .findById(id)
      .populate<{
        owner: { _id: string; login: string };
      }>('owner', { login: 1 })
      .lean();

    return {
      ...cat,
      id: cat._id,
      owner: cat.owner ? { id: cat.owner._id, login: cat.owner.login } : null,
    };
  }
  async update(id: string, updateCatDto: UpdateCatDto) {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
      lean: true,
      populate: {
        path: 'owner',
        select: 'login',
      },
    });

    return {
      ...updatedCat,
      id: updatedCat._id,
      owner:
        typeof updatedCat.owner === 'object'
          ? { id: updatedCat.owner._id, login: updatedCat.owner.login }
          : null,
    };
  }

  async delete(id: string) {
    await this.catModel.findByIdAndDelete(id);
  }
}
