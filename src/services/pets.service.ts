import api from './api';
import type { Pet, CreatePetDto, UpdatePetDto } from '../types/pet';

export const getPets = async (): Promise<Pet[]> => {
  const response = await api.get<Pet[]>('/pets');
  return response.data;
};

export const getPetById = async (id: string): Promise<Pet> => {
  const response = await api.get<Pet>(`/pets/${id}`);
  return response.data;
};

export const createPet = async (data: CreatePetDto): Promise<Pet> => {
  const response = await api.post<Pet>('/pets', data);
  return response.data;
};

export const updatePet = async (id: string, pet: UpdatePetDto): Promise<Pet> => {
  const response = await api.put<Pet>(`/pets/${id}`, pet);
  return response.data;
};

export const deletePet = async (id: string): Promise<void> => {
  await api.delete(`/pets/${id}`);
}; 