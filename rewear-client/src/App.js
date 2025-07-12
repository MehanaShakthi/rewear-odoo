import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // ✅ Make sure it's imported
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import BrowsePage from './pages/BrowsePage';
import ItemDetailPage from './pages/ItemDetailPage';
import AddItemPage from './pages/AddItemPage';
const App = () => {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/add-item" element={<AddItemPage />} />
        <Route path="/browse/:id" element={<ItemDetailPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />

      </Routes>
    </>
  );
};

export default App;
