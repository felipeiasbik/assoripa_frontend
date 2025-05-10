import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material';
import type { Pet } from '../types/pet';

interface PetListProps {
  pets: Pet[];
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: '1fr', 
        sm: 'repeat(2, 1fr)', 
        md: 'repeat(3, 1fr)' 
      }, 
      gap: 3 
    }}>
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
  );
};

export default PetList; 