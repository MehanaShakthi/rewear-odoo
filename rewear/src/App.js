import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import PrivateRoute from './components/Auth/PrivateRoute';
import AdminRoute from './components/Auth/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import ItemDetail from './pages/ItemDetail';
import AddItem from './pages/AddItem';
import Profile from './pages/Profile';
import AdminPanel from './pages/Admin/AdminPanel';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route path="/profile/:id" element={<Profile />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/add-item" element={
                  <PrivateRoute>
                    <AddItem />
                  </PrivateRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
