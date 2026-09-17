import React from 'react';
import { Bell, Briefcase, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../store/useStore';

export default function Notifications() {
  const notifications = useStore(state => state.notifications);
  const markRead = useStore(state => state.markNotificationsRead);

  // Helper to map icon types
  const getIcon = (type) => {
    switch(type) {
      case 'scheme': return <FileText className="text-brand-teal h-5 w-5" />;
      case 'job': return <Briefcase className="text-blue-500 h-5 w-5" />;
      case 'system': return <AlertCircle className="text-green-500 h-5 w-5" />;
      default: return <Bell className="text-gray-500 h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-navy">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">Stay updated on your services and applications.</p>
        </div>
        <Button variant="outline" size="sm" onClick={markRead}>Mark all as read</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {notifications.map((notif) => (
            <li key={notif.id} className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${notif.unread ? 'bg-brand-light/30' : ''}`}>
              <div className="mt-1 flex-shrink-0 bg-white p-2 rounded-full border border-gray-100 shadow-sm">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-semibold ${notif.unread ? 'text-brand-navy' : 'text-gray-700'}`}>{notif.title}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
              </div>
              {notif.unread && (
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-brand-teal rounded-full"></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
