import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import PetList from './pages/PetList';
import PetForm from './pages/PetForm';
import PetDetails from './pages/PetDetails';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="pets" element={<PetList />} />
        <Route path="pets/:id" element={<PetDetails />} />
        <Route
          path="pets/new"
          element={
            <PrivateRoute>
              <PetForm />
            </PrivateRoute>
          }
        />
        <Route
          path="pets/:id/edit"
          element={
            <PrivateRoute>
              <PetForm />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 