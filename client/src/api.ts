import axios from 'axios';
import { Cat } from './types';

const ApiClient = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3000' : '',
});

export function fetchCats() {
  return ApiClient.get<Cat[]>('/api/cats');
}

export function updateCat(cat: Partial<Cat>) {
  return ApiClient.patch<Cat>(`/api/cats/${cat.id}`, cat);
}

export function deleteCat(id: string) {
  return ApiClient.delete(`/api/cats/${id}`);
}

export function createCat(cat: Cat) {
  return ApiClient.post<Cat>('/api/cats', cat);
}
