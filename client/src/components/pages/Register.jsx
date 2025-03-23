import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-cyber-light p-8 rounded-lg border border-neon-blue/30">
        <h2 className="text-3xl font-bold mb-6 text-center neon-text">REGISTER</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-cyber-dark border border-neon-blue/30 focus:border-neon-blue focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-cyber-dark border border-neon-blue/30 focus:border-neon-blue focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-cyber-dark border border-neon-blue/30 focus:border-neon-blue focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-neon-pink to-neon-purple hover:shadow-neon-pink transition-shadow"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/signin" className="text-neon-pink hover:text-neon-purple">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;