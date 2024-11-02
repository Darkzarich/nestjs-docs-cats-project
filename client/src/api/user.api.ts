import { ApiClient } from './client';
import { User } from './types';

export function signIn({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  return ApiClient.post<User>('/api/user/sign-in', { login, password });
}

export function signUp({
  login,
  password,
  confirm,
}: {
  login: string;
  password: string;
  confirm: string;
}) {
  return ApiClient.post<User>('/api/user', { login, password, confirm });
}

export function fetchCurrentUser() {
  return ApiClient.get<User>('/api/user/current');
}
