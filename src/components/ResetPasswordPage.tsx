import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setLoading(true);
      setError('');
      
      const { data } = await axios.put(
        `http://localhost:5001/api/auth/reset-password/${resetToken}`,
        { password }
      );

      setSuccess('Password reset successful. Redirecting to login...');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Error resetting password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
      {/* Back to home */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="fixed top-4 left-4 flex items-center gap-1"
      >
        <ArrowLeft size={20} />
        Home
      </Button>
      
      <div className="w-full max-w-md space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground text-sm">
            Please enter your new password below.
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter new password"
                  value={password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className={cn(
                "w-full",
                loading && "opacity-70 cursor-not-allowed"
              )}
              disabled={loading}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ResetPasswordPage;
