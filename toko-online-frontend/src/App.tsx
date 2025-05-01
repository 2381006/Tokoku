import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import ProductCart from './pages/ProductCart';
import Cart from './pages/Cart';
import ProductManagement from './pages/ProductManagement';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><ProductCart /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
