import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Pets as PetsIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getPetById, deletePet, type Pet } from '../services/pet.service';

const PetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        if (!id) {
          throw new Error('ID não fornecido');
        }
        const data = await getPetById(id);
        setPet(data);
      } catch {
        setError('Erro ao carregar os detalhes do pet');
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleAdoptionClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!pet?.user?.phone) {
      setError('Número de WhatsApp do dono não disponível');
      return;
    }

    const message = `Olá! Me chamo ${user?.name} e tenho interesse em adotar o ${pet?.name}. Podemos conversar?`;
    const whatsappUrl = `https://wa.me/${pet.user.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      setLoading(true);
      await deletePet(id);
      navigate('/pets');
    } catch {
      setError('Erro ao deletar o pet');
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const canEdit = user && (user.role === 'admin' || pet?.userId === user.id);

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

  if (error || !pet) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Pet não encontrado'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/pets')}
          sx={{ mt: 2 }}
        >
          Voltar para Lista
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/pets')}
        sx={{ mt: 4 }}
      >
        Voltar para Lista
      </Button>

      <Paper sx={{ p: 4, mt: 4, mb: 8 }}>
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
          <Box>
            <Box
              component="img"
              src={pet.image}
              alt={pet.name}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
                backgroundColor: 'grey.100',
              }}
            />
          </Box>
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {pet.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  icon={<PetsIcon />}
                  label={pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                  color="primary"
                />
                <Chip label={pet.breed} />
                <Chip label={`${pet.age} anos`} />
                <Chip
                  label={
                    pet.size === 'small'
                      ? 'Pequeno'
                      : pet.size === 'medium'
                      ? 'Médio'
                      : 'Grande'
                  }
                />
              </Box>
              <Typography variant="body1" paragraph>
                {pet.description}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleAdoptionClick}
              >
                Quero Adotar
              </Button>

              {canEdit && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/pets/${id}/edit`)}
                    sx={{ px: 3 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteDialogOpen(true)}
                    sx={{ px: 3 }}
                  >
                    Deletar
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmar Deleção</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja deletar este pet? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Deletando...' : 'Deletar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PetDetails; 