import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../store/useStore';

export default function Profile() {
  const user = useStore(state => state.user);
  const login = useStore(state => state.login);
  const [name, setName] = useState(user?.name || 'Citizen User');
  const [email, setEmail] = useState(user?.email || 'citizen@example.com');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    login({ ...user, name, email });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white shadow-sm sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
          <div>
            <h3 className="text-lg leading-6 font-medium text-brand-navy">Citizen Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and preferences.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Completion: 85%</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-brand-teal h-full w-[85%]"></div>
            </div>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" defaultValue="1990-01-01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input type="tel" defaultValue="+91 9876543210" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm">
                <option>General</option>
                <option>OBC</option>
                <option>SC/ST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Income</label>
              <select className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm">
                <option>Below 1 Lakh</option>
                <option>1L - 2.5L</option>
                <option>2.5L - 5L</option>
                <option>Above 5L</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 flex justify-end items-center space-x-3">
            {isSaved && <span className="text-green-600 text-sm font-medium">Changes saved!</span>}
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
