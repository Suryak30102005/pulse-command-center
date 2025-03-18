
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PhoneCallIcon, ClockIcon, UserIcon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { 
      title: 'Live Calls', 
      icon: <PhoneCallIcon className="w-5 h-5" />, 
      path: '/' 
    },
    { 
      title: 'Call History', 
      icon: <ClockIcon className="w-5 h-5" />, 
      path: '/history' 
    },
    { 
      title: 'Profile', 
      icon: <UserIcon className="w-5 h-5" />, 
      path: '/profile' 
    }
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200 w-64 flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                  currentPath === item.path 
                    ? 'bg-gray-100 text-primary' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
