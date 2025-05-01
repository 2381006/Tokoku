import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError('Gagal mendaftar. Email mungkin sudah digunakan.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Nama"
          className="w-full border p-2 mb-4"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
