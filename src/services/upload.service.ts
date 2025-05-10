import api from './api';

interface UploadResponse {
  path: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteFile = async (filename: string): Promise<void> => {
  await api.delete(`/upload/${filename}`);
};

export const getFileUrl = (filename: string): string => {
  if (!filename) return '';
  if (filename.startsWith('http')) return filename;
  if (filename.startsWith('/uploads/')) {
    return `${import.meta.env.VITE_API_URL}${filename}`;
  }
  return `${import.meta.env.VITE_API_URL}/uploads/${filename}`;
}; 