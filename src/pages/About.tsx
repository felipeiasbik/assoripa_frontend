import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Pets as PetsIcon,
  Favorite as FavoriteIcon,
  VolunteerActivism as VolunteerIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

const About: React.FC = () => {
  const stats = [
    {
      icon: <PetsIcon sx={{ fontSize: 40 }} />,
      value: '500+',
      label: 'Pets Adotados',
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      value: '1000+',
      label: 'Vidas Transformadas',
    },
    {
      icon: <VolunteerIcon sx={{ fontSize: 40 }} />,
      value: '50+',
      label: 'Voluntários Ativos',
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      value: '10+',
      label: 'Anos de História',
    },
  ];

  const team = [
    {
      name: 'Maria Silva',
      role: 'Diretora',
      image: '/images/team/1.jpg',
    },
    {
      name: 'João Santos',
      role: 'Veterinário',
      image: '/images/team/2.jpg',
    },
    {
      name: 'Ana Oliveira',
      role: 'Coordenadora de Adoções',
      image: '/images/team/3.jpg',
    },
    {
      name: 'Pedro Costa',
      role: 'Voluntário',
      image: '/images/team/4.jpg',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4,
          }}
        >
          Sobre Nós
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            mb: 8,
            color: 'text.secondary',
          }}
        >
          Somos uma organização dedicada ao bem-estar animal, trabalhando
          incansavelmente para dar uma segunda chance a pets abandonados.
        </Typography>

        {/* Stats Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
            mb: 8,
          }}
        >
          {stats.map((stat, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>{stat.icon}</Box>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {stat.value}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 4,
            }}
          >
            Nossa Missão
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
              },
              gap: 4,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                O que fazemos
              </Typography>
              <Typography variant="body1" paragraph>
                Nossa missão é resgatar, cuidar e encontrar lares amorosos para
                animais abandonados. Trabalhamos para garantir que cada pet
                receba os cuidados necessários e encontre uma família que o
                ame.
              </Typography>
              <Typography variant="body1">
                Além disso, promovemos a conscientização sobre a importância da
                adoção responsável e do bem-estar animal em nossa comunidade.
              </Typography>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Nossos Valores
              </Typography>
              <Typography variant="body1" paragraph>
                • Amor e respeito por todos os animais
              </Typography>
              <Typography variant="body1" paragraph>
                • Compromisso com o bem-estar animal
              </Typography>
              <Typography variant="body1" paragraph>
                • Transparência em nossas ações
              </Typography>
              <Typography variant="body1">
                • Responsabilidade social e ambiental
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Team Section */}
        <Box>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 4,
            }}
          >
            Nossa Equipe
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 4,
            }}
          >
            {team.map((member, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {member.role}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About; 