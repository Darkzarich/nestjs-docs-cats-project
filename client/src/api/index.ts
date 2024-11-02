import { AxiosError } from 'axios';
import * as cats from './cats.api';
import * as user from './user.api';

export type ApiError = AxiosError<{ message: string; code: string }>;

export const Api = {
  ...cats,
  ...user,
};
