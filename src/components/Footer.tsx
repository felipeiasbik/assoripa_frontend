import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'grey.700',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {/* Logo e Descrição */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              ASSORIPA
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'white' }}>
              Uma organização dedicada ao resgate, cuidado e adoção de animais
              abandonados, transformando vidas através do amor e respeito aos animais.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="inherit"
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white' }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'white' }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Links Rápidos */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              Links Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{ textDecoration: 'none', color: 'white', '&:hover': { textDecoration: 'underline' } }}
              >
                Início
              </Link>
              <Link
                component={RouterLink}
                to="/pets"
                sx={{ textDecoration: 'none', color: 'white', '&:hover': { textDecoration: 'underline' } }}
              >
                Pets
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                sx={{ textDecoration: 'none', color: 'white', '&:hover': { textDecoration: 'underline' } }}
              >
                Sobre
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                sx={{ textDecoration: 'none', color: 'white', '&:hover': { textDecoration: 'underline' } }}
              >
                Contato
              </Link>
            </Box>
          </Box>

          {/* Contato */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
              Contato
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: 'white' }} />
                <Typography variant="body2" sx={{ color: 'white' }}>(11) 99999-9999</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: 'white' }} />
                <Typography variant="body2" sx={{ color: 'white' }}>contato@assoripa.org.br</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon sx={{ color: 'white' }} />
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Rua Exemplo, 123 - São Paulo, SP
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'white' }}>
            © {new Date().getFullYear()} ASSORIPA. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 