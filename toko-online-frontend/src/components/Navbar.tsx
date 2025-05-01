import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <Link to="/" className="font-bold text-xl">TokoKu</Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/">Barang</Link>
            <Link to="/cart">Keranjang</Link>
            <Link to="/products">Produk</Link>
            <Link to="/history">History</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
