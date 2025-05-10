import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import type { Pet } from '../types/pet';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <Card
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
  );
};

export default PetCard; 