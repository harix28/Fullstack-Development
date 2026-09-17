import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ROUTES from '@/constants/routes';
import { INDIAN_STATES } from '@/constants/categories'; // Assuming this exists or can be replaced

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    state: '',
    dob: '',
    gender: '',
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.fullName.trim()) return setError('Full Name is required.');
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return setError('Valid email is required.');
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) return setError('Valid 10-digit mobile number is required.');
    if (formData.password.length < 8) return setError('Password must be at least 8 characters.');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
    if (!formData.agreeTerms) return setError('You must agree to the Terms and Conditions.');

    setIsLoading(true);
    try {
      // Create user data object for context
      const userData = {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        state: formData.state,
        dob: formData.dob,
        gender: formData.gender
      };
      
      await register(userData, formData.password);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback for states if INDIAN_STATES isn't properly exported
  const statesList = Array.isArray(INDIAN_STATES) && INDIAN_STATES.length > 0 
    ? INDIAN_STATES 
    : ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh'];

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex md:w-[40%] bg-[#0f1740] text-white flex-col justify-between p-12 fixed inset-y-0 left-0">
        <div className="relative z-10">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-16">
            <span className="text-3xl">🏛</span>
            <span className="text-2xl font-bold tracking-tight text-white">
              Gov<span className="text-[#0d9488]">Connect</span>
            </span>
          </Link>
          
          <h1 className="text-4xl font-bold leading-tight mb-6">
            Start Your Journey.
          </h1>
          <p className="text-lg text-blue-100 mb-12 max-w-md">
            Create an account to access a unified platform tailored to your specific civic needs.
          </p>

          <div className="space-y-6">
            {[
              'Personalised Scheme Recommendations',
              'Automated Job Alerts',
              'Secure Document Vault',
              'Free AI Grievance Assistance'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="text-[#0d9488] w-6 h-6" />
                <span className="text-blue-50 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-12">
          <p className="text-sm text-blue-200">
            Already have an account?
          </p>
          <Link to={ROUTES.LOGIN} className="inline-flex items-center mt-2 text-white font-semibold hover:text-[#0d9488] transition-colors">
            Sign In Instead <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1a2f8a] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#0d9488] rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Right Panel - Form (Offset for fixed left panel) */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:ml-[40%] lg:px-16 xl:px-24 py-12">
        <div className="mx-auto w-full max-w-2xl">
          <div className="md:hidden flex items-center justify-between mb-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <span className="text-3xl">🏛</span>
              <span className="text-2xl font-bold tracking-tight text-[#0f1740]">
                Gov<span className="text-[#0d9488]">Connect</span>
              </span>
            </Link>
            <Link to={ROUTES.LOGIN} className="text-sm font-medium text-[#0d9488]">
              Login
            </Link>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#0f1740]">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in your details below to get started. All fields are secure.
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
              {/* Personal Details Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    id="fullName" name="fullName" type="text" required
                    value={formData.fullName} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm placeholder-gray-400 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                    placeholder="As per official ID"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                  <input
                    id="email" name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm placeholder-gray-400 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Contact & Demographics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile *</label>
                  <input
                    id="mobile" name="mobile" type="tel" maxLength={10} required
                    value={formData.mobile} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm placeholder-gray-400 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                    placeholder="10 digits"
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    id="dob" name="dob" type="date"
                    value={formData.dob} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm text-gray-700 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    id="gender" name="gender"
                    value={formData.gender} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm text-gray-700 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* State Selection */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Union Territory</label>
                <select
                  id="state" name="state"
                  value={formData.state} onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm text-gray-700 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                >
                  <option value="">Select your state...</option>
                  {statesList.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
                  <div className="mt-1 relative">
                    <input
                      id="password" name="password" type={showPassword ? 'text' : 'password'} required
                      value={formData.password} onChange={handleChange}
                      className="block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm placeholder-gray-400 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                      placeholder="Min 8 characters"
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
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required
                      value={formData.confirmPassword} onChange={handleChange}
                      className="block w-full px-3 py-3 border border-[#e2e8f0] rounded-lg shadow-sm placeholder-gray-400 focus:ring-[#0d9488] focus:border-[#0d9488] sm:text-sm"
                      placeholder="Repeat password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms" name="agreeTerms" type="checkbox" required
                    checked={formData.agreeTerms} onChange={handleChange}
                    className="w-4 h-4 text-[#0d9488] border-gray-300 rounded focus:ring-[#0d9488]"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                    I agree to the <a href="#" className="text-[#0d9488] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0d9488] hover:underline">Privacy Policy</a>.
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-[#0f1740] hover:bg-[#1a2f8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f1740] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
            
            <div className="mt-8 flex justify-center md:hidden">
              <span className="text-sm text-gray-600">
                <Shield className="w-4 h-4 inline mr-1 text-gray-400" /> Secure Registration
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
