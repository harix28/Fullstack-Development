import React, { useState } from 'react';
import { User, Shield, Bell, Download, Trash2, ExternalLink, Globe } from 'lucide-react';
import { Button, Card, Modal } from '@/components/ui';
import { mockUser } from '@/data/mockUser';

export default function SettingsPage() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    language: 'en',
    emailNotifs: true,
    smsNotifs: false,
    pushNotifs: true,
    dataVisibility: true
  });

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <button 
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2f8a] focus-visible:ring-opacity-75 ${checked ? 'bg-[#1a2f8a]' : 'bg-gray-200'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#0f1740] mb-2">Settings</h1>
        <p className="text-[#64748b]">Manage your account settings, preferences, and privacy.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-[#0f1740] mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-gray-500" /> Account Settings
        </h2>
        <Card className="divide-y divide-gray-100">
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="text" disabled value={mockUser.email.replace(/(.{2})(.*)(?=@)/, "$1***")} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="text" disabled value={mockUser.phone.replace(/(\d{2})(\d{4})(\d{4})/, "+91 ******$3")} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm" />
              </div>
            </div>
            <p className="text-xs text-gray-500">To change your primary email or phone number, please use the DigiLocker update process.</p>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4 max-w-md">
              <input type="password" placeholder="Current Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a2f8a] text-sm" />
              <input type="password" placeholder="New Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a2f8a] text-sm" />
              <input type="password" placeholder="Confirm New Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1a2f8a] text-sm" />
              <Button className="bg-[#1a2f8a]">Update Password</Button>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#0f1740] mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-gray-500" /> Preferences
        </h2>
        <Card className="divide-y divide-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Application Language</h3>
                <p className="text-sm text-gray-500">Choose your preferred language for the interface.</p>
              </div>
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="lang" checked={preferences.language === 'en'} onChange={() => setPreferences({...preferences, language: 'en'})} className="text-[#1a2f8a] focus:ring-[#1a2f8a]" />
                <span className="text-sm font-medium">English</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="lang" checked={preferences.language === 'hi'} onChange={() => setPreferences({...preferences, language: 'hi'})} className="text-[#1a2f8a] focus:ring-[#1a2f8a]" />
                <span className="text-sm font-medium">Hindi (हिंदी)</span>
              </label>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Notification Preferences</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive updates about applications and schemes via email.</p>
              </div>
              <Toggle checked={preferences.emailNotifs} onChange={() => setPreferences({...preferences, emailNotifs: !preferences.emailNotifs})} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">SMS Alerts</p>
                <p className="text-xs text-gray-500">Get critical alerts and OTPs on your registered mobile.</p>
              </div>
              <Toggle checked={preferences.smsNotifs} onChange={() => setPreferences({...preferences, smsNotifs: !preferences.smsNotifs})} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                <p className="text-xs text-gray-500">Browser notifications for real-time updates.</p>
              </div>
              <Toggle checked={preferences.pushNotifs} onChange={() => setPreferences({...preferences, pushNotifs: !preferences.pushNotifs})} />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[#0f1740] mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-gray-500" /> Privacy & Data
        </h2>
        <Card className="divide-y divide-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Allow Profile Data for Recommendations</p>
                <p className="text-xs text-gray-500">We use your profile data to suggest relevant schemes and jobs. Turning this off will disable personalized recommendations.</p>
              </div>
              <Toggle checked={preferences.dataVisibility} onChange={() => setPreferences({...preferences, dataVisibility: !preferences.dataVisibility})} />
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Download My Data</h3>
                <p className="text-xs text-gray-500">Get a copy of your personal data, uploaded documents, and history.</p>
              </div>
              <Button variant="outline" className="shrink-0"><Download className="w-4 h-4 mr-2" /> Request Archive</Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button variant="outline" size="sm" className="text-gray-600">Clear Saved Schemes</Button>
              <Button variant="outline" size="sm" className="text-gray-600">Clear Saved Jobs</Button>
            </div>
          </div>

          <div className="p-6 bg-red-50/50 rounded-b-xl border-t border-red-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-red-700">Delete Account</h3>
                <p className="text-xs text-red-600 mt-1">Permanently delete your GovConnect account and all associated data. This action cannot be undone.</p>
              </div>
              <Button variant="danger" onClick={() => setDeleteModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white shrink-0">
                <Trash2 className="w-4 h-4 mr-2" /> Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section className="text-center pt-8 border-t">
        <p className="text-sm font-medium text-gray-500 mb-2">GovConnect v1.0.0 (Beta)</p>
        <div className="flex items-center justify-center gap-4 text-xs text-[#1a2f8a]">
          <a href="#" className="hover:underline flex items-center">Privacy Policy <ExternalLink className="w-3 h-3 ml-1" /></a>
          <a href="#" className="hover:underline flex items-center">Terms of Service <ExternalLink className="w-3 h-3 ml-1" /></a>
          <a href="#" className="hover:underline flex items-center">Help Center <ExternalLink className="w-3 h-3 ml-1" /></a>
        </div>
        <p className="text-xs text-gray-400 mt-4 max-w-2xl mx-auto">
          GovConnect is an assistance platform designed to help citizens navigate government services. It is not an official government entity. Information provided is for guidance purposes only.
        </p>
      </section>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Account">
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-bold text-red-800 mb-2">Warning: Irreversible Action</h4>
            <p className="text-sm text-red-700">
              Deleting your account will permanently remove your profile, document references, saved schemes, and grievance drafts from GovConnect. You will lose access to all personalized recommendations.
            </p>
          </div>
          <p className="text-sm text-gray-700 font-medium">To confirm, please type "DELETE" below:</p>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Type DELETE" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" className="bg-red-600 hover:bg-red-700 text-white" disabled>Delete My Account</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
