import { SignInDto } from '../dto/sign-in-dto';
import { SignUpDto } from '../dto/sign-up-dto';
import { User } from '../schemas/user.schema';

export const USER_REPOSITORY = Symbol('UserRepository');

export interface IUserRepository {
  create(createCatDto: SignUpDto): Promise<User>;
  findByLogin(findCatsDto: SignInDto): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
