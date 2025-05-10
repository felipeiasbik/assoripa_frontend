import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Contact: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contato
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Informações de Contato
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Phone sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="body1">
              (11) 99999-9999
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Email sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="body1">
              contato@assoripa.org.br
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="body1">
              Rua Exemplo, 123 - Bairro<br />
              São Paulo - SP, 01234-567
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Horário de Funcionamento
        </Typography>
        <Typography variant="body1" paragraph>
          Segunda a Sexta: 9h às 18h<br />
          Sábado: 9h às 13h<br />
          Domingo: Fechado
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Redes Sociais
        </Typography>
        <Typography variant="body1">
          Siga-nos nas redes sociais para ficar por dentro das novidades e eventos:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            • Instagram: @assoripa<br />
            • Facebook: /assoripa<br />
            • Twitter: @assoripa
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact; 