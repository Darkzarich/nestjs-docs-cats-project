import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in-dto';
import { SignUpDto } from '../dto/sign-up-dto';
import { User } from '../schemas/user.schema';
import { IUserRepository } from './user.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoUserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(signUpDto: SignUpDto) {
    const newUser = await this.userModel.create(signUpDto);

    return newUser.toJSON();
  }

  async findByLogin(signInDto: SignInDto) {
    const user = await this.userModel.findOne({ login: signInDto.login });

    if (!user) return null;

    return user.toJSON();
  }
}
