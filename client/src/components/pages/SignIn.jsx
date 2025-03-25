import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    if (result.success) {
      navigate("/recognition");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-cyber-light p-8 rounded-lg border border-neon-blue/30">
        <h2 className="text-3xl font-bold mb-6 text-center neon-text">
          SIGN IN
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-500">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full py-2 px-4 rounded-md bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-shadow"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-neon-blue hover:text-neon-purple"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
