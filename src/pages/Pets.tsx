import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import * as petsService from '../services/pets.service';
import type { Pet } from '../types/pet';

const Pets: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await petsService.getPets();
      setPets(data);
    } catch {
      setError('Erro ao carregar os pets');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/pets/new' } });
    } else {
      navigate('/pets/new');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Pets Disponíveis
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPet}
        >
          Adicionar Pet
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {pets.map((pet) => (
          <Card
            key={pet.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                cursor: 'pointer',
                backgroundColor: '#e3f2fd',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              },
              backgroundColor: '#f5f9ff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            }}
            onClick={() => navigate(`/pets/${pet.id}`)}
          >
            <CardMedia
              component="img"
              image={pet.image}
              alt={pet.name}
              sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '300px',
                aspectRatio: '1/1',
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {pet.name}
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Chip
                  label={pet.species}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={`${pet.age} anos`}
                  color="secondary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={pet.breed}
                  color="info"
                  size="small"
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {pet.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Pets;