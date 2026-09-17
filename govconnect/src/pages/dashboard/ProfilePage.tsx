import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockUser } from '@/data/mockUser';
import { Button, Card, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const userData = user || mockUser;
  
  const [formData, setFormData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* LEFT: PROFILE SIDEBAR */}
      <div className="w-full md:w-1/3 xl:w-1/4 space-y-6">
        <Card className="p-6 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-[#1a2f8a] text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
            {formData.name?.charAt(0) || 'U'}
          </div>
          <h2 className="text-xl font-bold text-[#0f1740]">{formData.name}</h2>
          <p className="text-sm text-[#64748b] mb-6">{formData.email}</p>
          
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#0f1740]">Profile Completion</span>
              <span className="text-sm font-bold text-[#0d9488]">72%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-[#0d9488] h-2.5 rounded-full" style={{ width: '72%' }}></div>
            </div>
            <p className="text-xs text-[#64748b] mt-3">Complete your profile to get better recommendations</p>
          </div>
        </Card>
      </div>

      {/* RIGHT: FORMS */}
      <div className="w-full md:w-2/3 xl:w-3/4">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1740]">My Profile</h2>
            {isEditing ? (
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>

          {showToast && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
              Profile updated successfully!
            </div>
          )}

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6 overflow-x-auto whitespace-nowrap">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="employment">Employment & Income</TabsTrigger>
              <TabsTrigger value="family">Family & Category</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Full Name</label>
                  <input type="text" disabled className="w-full p-2 border rounded-md bg-slate-50 text-[#64748b]" value={formData.name || ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Email</label>
                  <input type="email" disabled className="w-full p-2 border rounded-md bg-slate-50 text-[#64748b]" value={formData.email || ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Mobile</label>
                  <input type="text" disabled className="w-full p-2 border rounded-md bg-slate-50 text-[#64748b]" value={formData.mobile || '+91 9876543210'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Date of Birth</label>
                  <input type="date" disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50" defaultValue="1995-05-15" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Gender</label>
                  <select disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">State</label>
                  <input type="text" disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50" defaultValue="Maharashtra" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">District</label>
                  <input type="text" disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50" defaultValue="Mumbai" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Highest Education Level</label>
                  <select disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50">
                    <option>Graduate</option>
                    <option>Post Graduate</option>
                    <option>Higher Secondary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Field of Study</label>
                  <input type="text" disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50" defaultValue="Computer Science" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="employment" className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Occupation Status</label>
                  <select disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50">
                    <option>Employed</option>
                    <option>Unemployed</option>
                    <option>Student</option>
                    <option>Self-employed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Annual Income (₹)</label>
                  <input type="number" disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50" defaultValue="500000" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="family" className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Category</label>
                  <select disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50">
                    <option>General</option>
                    <option>OBC</option>
                    <option>SC</option>
                    <option>ST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Family Category</label>
                  <select disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50">
                    <option>APL</option>
                    <option>BPL</option>
                  </select>
                </div>
                 <div className="col-span-1 md:col-span-2 flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="disability" disabled={!isEditing} className="rounded" />
                  <label htmlFor="disability" className="text-sm font-medium text-[#0f1740]">Has Disability?</label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f1740] mb-1">Language Preference</label>
                  <select disabled={!isEditing} className="w-full p-2 border rounded-md disabled:bg-slate-50">
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="emailNotif" disabled={!isEditing} defaultChecked className="rounded" />
                    <label htmlFor="emailNotif" className="text-sm font-medium text-[#0f1740]">Email Notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="smsNotif" disabled={!isEditing} defaultChecked className="rounded" />
                    <label htmlFor="smsNotif" className="text-sm font-medium text-[#0f1740]">SMS Notifications</label>
                  </div>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
