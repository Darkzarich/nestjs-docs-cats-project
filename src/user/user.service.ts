import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-dto';
import { SignInDto } from './dto/sign-in-dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from './repositories/user.repository.interface';
import { comparePassword } from 'src/common/utils/compare-password';
import { WrongCredentialsError } from './errors/wrong-credentials';
import { hashPassword } from 'src/common/utils/hash-password';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    if (signUpDto.password !== signUpDto.confirm) {
      throw new BadRequestException(['Passwords do not match']);
    }

    signUpDto.password = await hashPassword(signUpDto.password);

    const user = await this.userRepository.create(signUpDto);

    return {
      id: user.id,
      login: user.login,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findByLogin(signInDto);

    if (!user) {
      throw new WrongCredentialsError();
    }

    const isMatch = await comparePassword(signInDto.password, user.password);

    if (!isMatch) {
      throw new WrongCredentialsError();
    }

    return {
      id: user.id,
      login: user.login,
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
}
