import axios, { AxiosError } from 'axios';
import { Cat } from './types';

const ApiClient = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3000' : '',
});

export type ApiError = AxiosError<{ message: string; code: string }>;

export function fetchCats() {
  return ApiClient.get<Cat[]>('/api/cats');
}

export function updateCat(id: Cat['id'], cat: Partial<Cat>) {
  return ApiClient.patch<Cat>(`/api/cats/${id}`, cat);
}

export function deleteCat(id: Cat['id']) {
  return ApiClient.delete(`/api/cats/${id}`);
}

export function createCat(cat: Cat) {
  return ApiClient.post<Cat>('/api/cats', cat);
}
