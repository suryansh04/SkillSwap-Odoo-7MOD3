import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };

      const { data } = await axios.post(
        'http://localhost:5001/api/auth/register',
        { name, email, password },
        config
      );
      
      console.log('Signup successful:', data);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || 
        error.response?.data?.errors?.[0]?.msg || 
        'Failed to create an account'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
      {/* Back to home */}
      <Link to="/" className="fixed top-4 left-4 text-primary flex items-center gap-1">
        <ArrowLeft size={20} />
        Home
      </Link>
      
      <div className="w-full max-w-md space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm">
            Join our platform to get started.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                value={name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="********" 
                value={password}
                onChange={handleChange}
                minLength={6}
                required 
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
        </form>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary underline underline-offset-2">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
