export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  image: string;
  status: 'available' | 'adopted';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePetDto {
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  image: string;
  status: 'available' | 'adopted';
}

export type UpdatePetDto = Partial<CreatePetDto>; 