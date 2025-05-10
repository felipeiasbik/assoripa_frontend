import api from './api';
import { getFileUrl } from './upload.service';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
}

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: number;
  gender: string;
  color: string;
  size: string;
  description: string;
  image: string;
  userId: string;
  user?: User;
}

export interface CreatePetDto {
  name: string;
  breed: string;
  age: number;
  gender: string;
  color: string;
  size: string;
  description: string;
  image: string;
}

export type UpdatePetDto = Partial<CreatePetDto>;

export const getPets = async (): Promise<Pet[]> => {
  const response = await api.get<Pet[]>('/pets');
  return response.data.map(pet => ({
    ...pet,
    image: getFileUrl(pet.image)
  }));
};

export const getPetById = async (id: string): Promise<Pet> => {
  const response = await api.get<Pet>(`/pets/${id}`, {
    headers: {
      Authorization: undefined
    }
  });
  return {
    ...response.data,
    image: getFileUrl(response.data.image)
  };
};

export const createPet = async (data: CreatePetDto): Promise<Pet> => {
  const response = await api.post<Pet>('/pets', data);
  return {
    ...response.data,
    image: getFileUrl(response.data.image)
  };
};

export const updatePet = async (id: string, data: UpdatePetDto): Promise<Pet> => {
  const response = await api.put<Pet>(`/pets/${id}`, data);
  return {
    ...response.data,
    image: getFileUrl(response.data.image)
  };
};

export const deletePet = async (id: string): Promise<void> => {
  await api.delete(`/pets/${id}`);
}; 