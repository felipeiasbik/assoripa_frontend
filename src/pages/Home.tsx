import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
} from '@mui/material';
import { Pets as PetsIcon, Favorite as FavoriteIcon, Security as SecurityIcon } from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getPets, type Pet } from '../services/pet.service';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const data = await getPets();
        setPets(data);
      } catch {
        setError('Erro ao carregar os pets. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'rgba(144, 202, 249, 0.95)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Adote um Pet
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Dê um lar para um animal que precisa de amor e carinho.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/pets')}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 'medium',
                  borderRadius: 2,
                }}
              >
                Ver Pets Disponíveis
              </Button>
            </Box>
            {!loading && !error && pets.length > 0 && (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 500,
                  height: 400,
                  overflow: 'hidden',
                  flex: 1,
                }}
              >
                {pets.slice(0, 5).map((pet, index) => (
                  <Box
                    key={pet.id}
                    component="img"
                    src={pet.image}
                    alt={pet.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: index === 0 ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out',
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Featured Pets Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Pets em Destaque
          </Typography>
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
              overflow: 'hidden',
              mx: 'auto',
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Carousel
              responsive={responsive}
              infinite
              centerMode
              autoPlay
              autoPlaySpeed={3000}
              arrows
            >
              {pets.map((pet) => (
                <Box
                  key={pet.id}
                  sx={{
                    px: 1,
                    height: '100%',
                    pb: 2,
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: 6,
                        '& .MuiCardMedia-root': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <CardActionArea onClick={() => navigate(`/pets/${pet.id}`)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={pet.image}
                        alt={pet.name}
                        sx={{
                          objectFit: 'cover',
                          height: 200,
                          backgroundColor: 'grey.100',
                          transition: 'transform 0.3s ease-in-out',
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
                            icon={<PetsIcon color="primary" sx={{ color: 'white' }} />}
                            label={pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                            sx={{
                              bgcolor: 'rgba(144, 202, 249, 0.95)',
                              color: 'white',
                            }}
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {pet.breed} • {pet.age} anos
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Sobre a Assoripa
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
              A Assoripa é uma organização dedicada ao bem-estar animal, promovendo a adoção responsável
              e oferecendo cuidados e proteção aos animais em situação de vulnerabilidade.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/about')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 2,
              }}
            >
              Conheça Nossa História
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <FavoriteIcon sx={{ fontSize: 60, color: 'rgba(144, 202, 249, 0.95)', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Amor Incondicional
            </Typography>
            <Typography>
              Adote um pet e receba todo o amor e carinho que ele tem para dar
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <SecurityIcon sx={{ fontSize: 60, color: 'rgba(144, 202, 249, 0.95)', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Processo Seguro
            </Typography>
            <Typography>
              Todos os nossos pets são vacinados e castrados antes da adoção
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <PetsIcon sx={{ fontSize: 60, color: 'rgba(144, 202, 249, 0.95)', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Vários Pets
            </Typography>
            <Typography>
              Encontre o pet perfeito para você entre cães e gatos de todas as idades
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}; 