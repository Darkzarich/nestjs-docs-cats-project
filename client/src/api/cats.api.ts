import { Cat } from './types';
import { ApiClient } from './client';

export function fetchCats() {
  return ApiClient.get<Cat[]>('/api/cats');
}

export function updateCat(id: Cat['id'], cat: Partial<Cat>) {
  return ApiClient.patch<Cat>(`/api/cats/${id}`, cat);
}

export function deleteCat(id: Cat['id']) {
  return ApiClient.delete(`/api/cats/${id}`);
}

export function createCat(cat: Omit<Cat, 'id'>) {
  return ApiClient.post<Cat>('/api/cats', cat);
}
