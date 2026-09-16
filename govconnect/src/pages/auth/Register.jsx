import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock register logic
    navigate('/login');
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-brand-navy">
            Create your Citizen Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-teal hover:text-brand-teal/80">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required type="text" className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input required type="email" className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input required type="tel" className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm">
                <option>Select State</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input required type="password" className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input required type="password" className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
