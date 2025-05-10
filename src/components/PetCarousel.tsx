import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';
import type { Pet } from '../services/pet.service';

interface PetCarouselProps {
  pets: Pet[];
}

const PetCarousel: React.FC<PetCarouselProps> = ({ pets }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const PETS_PER_VIEW = 4;

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, pets.length - PETS_PER_VIEW) : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= pets.length - PETS_PER_VIEW ? 0 : prevIndex + 1
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', mt: 4, mb: 4, px: 4 }}>
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            bgcolor: 'background.paper',
          },
          zIndex: 1,
          width: 40,
          height: 40,
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          minHeight: 380,
          transition: 'transform 0.3s ease-in-out',
          transform: `translateX(-${currentIndex * (280 + 24)}px)`,
          overflow: 'visible',
          position: 'relative',
        }}
      >
        {pets.map((pet) => (
          <Card
            key={pet.id}
            sx={{
              flex: '0 0 280px',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 3,
              },
            }}
            onClick={() => navigate(`/pets/${pet.id}`)}
          >
            <CardMedia
              component="img"
              height="250"
              image={pet.image}
              alt={pet.name}
              sx={{
                objectFit: 'cover',
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                  {pet.name}
                </Typography>
                <Chip
                  icon={<PetsIcon />}
                  label={pet.type === 'dog' ? 'Cachorro' : 'Gato'}
                  color="primary"
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {pet.breed} • {pet.age} anos • {pet.gender === 'male' ? 'Macho' : 'Fêmea'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {pet.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            bgcolor: 'background.paper',
          },
          zIndex: 1,
          width: 40,
          height: 40,
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default PetCarousel; 