import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material';
import { uploadFile } from '../services/upload.service';
import { getPetById, createPet, updatePet } from '../services/pet.service';

const PetForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    color: '',
    size: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const pet = await getPetById(id);
        setFormData({
          name: pet.name,
          breed: pet.breed,
          age: pet.age.toString(),
          gender: pet.gender,
          color: pet.color,
          size: pet.size,
          description: pet.description,
          image: pet.image,
        });
        setImagePreview(pet.image);
      } catch {
        setError('Erro ao carregar os dados do pet');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setLoading(true);
      const response = await uploadFile(file);
      setFormData((prev) => ({
        ...prev,
        image: response.path,
      }));
    } catch {
      setError('Erro ao fazer upload da imagem');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const petData = {
        ...formData,
        age: Number(formData.age),
      };

      if (isEditMode && id) {
        await updatePet(id, petData);
      } else {
        await createPet(petData);
      }
      navigate('/pets');
    } catch {
      setError(isEditMode ? 'Erro ao atualizar o pet' : 'Erro ao criar o pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4,
          }}
        >
          {isEditMode ? 'Editar Pet' : 'Cadastrar Novo Pet'}
        </Typography>

        <Paper sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Raça"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                  />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Idade"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    select
                    label="Gênero"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="male">Macho</MenuItem>
                    <MenuItem value="female">Fêmea</MenuItem>
                  </TextField>
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Cor"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                  />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    select
                    label="Porte"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="small">Pequeno</MenuItem>
                    <MenuItem value="medium">Médio</MenuItem>
                    <MenuItem value="large">Grande</MenuItem>
                  </TextField>
                </Box>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Descrição"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box>
                <Box sx={{ mb: 2 }}>
                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      disabled={loading}
                    >
                      {isEditMode ? 'Alterar Imagem' : 'Upload de Imagem'}
                    </Button>
                  </label>
                </Box>
                {imagePreview && (
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      maxHeight: 300,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/pets')}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Salvando...' : isEditMode ? 'Atualizar' : 'Salvar'}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default PetForm; 