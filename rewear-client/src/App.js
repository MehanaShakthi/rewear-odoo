import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import BrowsePage from './pages/BrowsePage';
import ItemDetailPage from './pages/ItemDetailPage';
import AdminPanelPage from './pages/AdminPanelPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
