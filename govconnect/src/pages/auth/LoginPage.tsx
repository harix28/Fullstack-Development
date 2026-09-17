import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ROUTES from '@/constants/routes';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(identifier, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-[#0f1740] text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-16">
            <span className="text-3xl">🏛</span>
            <span className="text-2xl font-bold tracking-tight text-white">
              Gov<span className="text-[#0d9488]">Connect</span>
            </span>
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Empowering Citizens.<br />Simplifying Access.
          </h1>
          <p className="text-lg text-blue-100 mb-12 max-w-md">
            Your unified portal for discovering schemes, tracking government jobs, and managing official documents.
          </p>

          <div className="space-y-6">
            {[
              'One unified profile for multiple services',
              'Privacy-first document storage',
              'AI-powered grievance drafting'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="text-[#0d9488] w-6 h-6" />
                <span className="text-blue-50">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#1a2f8a] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-20 -left-20 w-64 h-64 bg-[#0d9488] rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <span className="text-3xl">🏛</span>
            <span className="text-2xl font-bold tracking-tight text-[#0f1740]">
              Gov<span className="text-[#0d9488]">Connect</span>
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#0f1740]">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in.
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                  Email or Mobile Number
                </label>
                <div className="mt-1">
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                    placeholder="Enter your email or 10-digit mobile"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#0d9488] focus:ring-[#0d9488] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to={ROUTES.FORGOT_PASSWORD} className="font-medium text-[#0d9488] hover:text-teal-700">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0f1740] hover:bg-[#1a2f8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f1740] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to={ROUTES.REGISTER} className="font-medium text-[#0d9488] hover:text-teal-700 inline-flex items-center">
                    Register now <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
