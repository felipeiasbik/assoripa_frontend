import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  type SelectChangeEvent,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Pets as PetsIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { getPets, type Pet } from '../services/pet.service';

const PetList: React.FC = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    gender: 'all',
    size: 'all',
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.type === 'all' || pet.type === filters.type;
    const matchesGender = filters.gender === 'all' || pet.gender === filters.gender;
    const matchesSize = filters.size === 'all' || pet.size === filters.size;

    return matchesSearch && matchesType && matchesGender && matchesSize;
  });

  const paginatedPets = filteredPets.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);

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

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
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
          Adote seu Melhor Amigo
        </Typography>

        {/* Add Pet Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/pets/new')}
          >
            Cadastrar Pet
          </Button>
        </Box>

        {/* Search and Filters */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '2fr 1fr 1fr 1fr',
            },
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            fullWidth
            placeholder="Buscar por nome, raça ou descrição..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              label="Tipo"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="dog">Cachorro</MenuItem>
              <MenuItem value="cat">Gato</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Gênero</InputLabel>
            <Select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              label="Gênero"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="male">Macho</MenuItem>
              <MenuItem value="female">Fêmea</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Porte</InputLabel>
            <Select
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
              label="Porte"
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="small">Pequeno</MenuItem>
              <MenuItem value="medium">Médio</MenuItem>
              <MenuItem value="large">Grande</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Results Count */}
        <Typography variant="body1" sx={{ mb: 4 }}>
          {filteredPets.length} pets encontrados
        </Typography>

        {/* Pet Grid */}
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
          {paginatedPets.map((pet) => (
            <Box key={pet.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
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
                        icon={<PetsIcon  />}
                        label={pet.gender === 'male' ? 'Macho' : 'Fêmea'}
                        color="primary"
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {pet.breed} • {pet.age} anos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PetList; 