'use client';

import { Bell, Search, User, LogOut, Mail, Phone, MapPin, Award } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  userName: string;
  userRole: string;
  userEmail?: string;
  userPhone?: string;
  userLocation?: string;
  userRating?: number;
  studentName?: string;
}

interface UserProfile {
  email: string;
  name: string;
  role: string;
  phone?: string;
  location?: string;
  title?: string;
  rating?: number;
  students?: number;
  age?: number;
  coach?: string;
  specialization?: string[];
  experience?: number;
}

export default function DashboardHeader({ userName, userRole, studentName: _studentName }: DashboardHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notificationItems, setNotificationItems] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch real user profile & broadcasts as notifications
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data.user);
        }
      } catch {
        // Silently fail — header still shows passed-in userName/userRole
      }
    };
    fetchProfile();

    // Fetch broadcasts as notification items
    fetch('/api/broadcasts')
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.data) setNotificationItems(json.data.slice(0, 10));
      })
      .catch(() => {});
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue with redirect even if API call fails
    }
    router.push('/auth/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Welcome Text */}
        <div className="ml-12 lg:ml-16 min-w-0 flex-1">
          <h2 className="text-base sm:text-xl lg:text-2xl font-heading font-bold text-primary-blue truncate">
            Welcome, {userName}!
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">Here&apos;s what&apos;s happening today</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          {/* Search - Desktop */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 lg:pl-10 pr-3 lg:pr-4 py-1.5 lg:py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange w-32 lg:w-auto"
            />
          </div>

          {/* Search - Mobile Toggle */}
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Search"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); }}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              {notificationItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                  {notificationItems.length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[60vh] overflow-y-auto">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                </div>
                {notificationItems.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No new notifications
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notificationItems.map((item: any) => (
                      <div key={item._id || item.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.content}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                          {item.senderName ? ` • ${item.senderName}` : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-2 border-t border-gray-200 text-center">
                  <button
                    onClick={() => { setIsNotificationsOpen(false); router.push(`/dashboard/${userRole === 'admin' ? 'admin' : userRole === 'coach' ? 'coach' : 'student'}/broadcast`); }}
                    className="text-xs text-primary-blue hover:underline"
                  >
                    View All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-all min-h-[44px] min-w-[44px]"
              aria-label="User Menu"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-blue rounded-full flex items-center justify-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
                {/* User Info Header */}
                <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-primary-blue to-primary-olive">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary-blue" />
                    </div>
                    <div className="text-white min-w-0">
                      <p className="font-bold text-base sm:text-lg truncate">{userProfile?.name || userName}</p>
                      <p className="text-xs sm:text-sm opacity-90 capitalize truncate">{userRole}</p>
                      {userProfile?.title && (
                        <p className="text-xs opacity-75 truncate">{userProfile.title}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {/* Email */}
                  {userProfile?.email && (
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                      <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium truncate">{userProfile.email}</span>
                    </div>
                  )}

                  {/* Phone */}
                  {userProfile?.phone && (
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{userProfile.phone}</span>
                    </div>
                  )}

                  {/* Location */}
                  {userProfile?.location && (
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium truncate">{userProfile.location}</span>
                    </div>
                  )}

                  {/* Role-specific details */}
                  {userRole === 'coach' && userProfile?.rating && (
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                      <Award className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">Rating: {userProfile.rating}/5.0</span>
                    </div>
                  )}

                  {userRole === 'admin' && (
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                      <Award className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">System Administrator</span>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <div className="p-3 sm:p-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all min-h-[44px]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium text-sm sm:text-base">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {showSearch && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
