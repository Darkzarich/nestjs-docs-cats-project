import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-dto';
import { SignInDto } from './dto/sign-in-dto';
import {
  IUserRepository,
  USER_REPOSITORY,
} from './repositories/user.repository.interface';
import { comparePassword } from 'src/common/utils/compare-password';
import { WrongCredentialsError } from './errors/wrong-credentials';
import { hashPassword } from 'src/common/utils/hash-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    if (signUpDto.password !== signUpDto.confirm) {
      throw new BadRequestException(['Passwords do not match']);
    }

    signUpDto.password = await hashPassword(signUpDto.password);

    const user = await this.userRepository.create(signUpDto);

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return {
      id: user.id,
      login: user.login,
      token: accessToken,
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

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return {
      id: user.id,
      login: user.login,
      token: accessToken,
    };
  }

  async current(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(['User with this id is not found']);
    }

    // Renew token so it's expiration date is updated
    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return {
      id: user.id,
      login: user.login,
      token: accessToken,
    };
  }
}
