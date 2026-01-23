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
  studentName?: string; // For parent dashboard
}

// User details based on role
const getUserDetails = (role: string, userName: string) => {
  const details: Record<string, any> = {
    coach: {
      email: 'ramesh.kumar@ica.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, India',
      rating: 4.8,
      title: 'International Master',
      students: 24
    },
    student: {
      email: 'arjun.patel@email.com',
      phone: '+91 98765 43211',
      location: 'Delhi, India',
      rating: 1350,
      age: 12,
      coach: 'IM Ramesh Kumar'
    },
    parent: {
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43212',
      location: 'Delhi, India',
      studentName: 'Arjun Patel',
      studentRating: 1350,
      studentAge: 12
    },
    admin: {
      email: 'admin@ica.com',
      phone: '+91 98765 43213',
      location: 'Headquarters',
      role: 'System Administrator'
    }
  };
  
  return details[role] || {};
};

export default function DashboardHeader({ userName, userRole, studentName }: DashboardHeaderProps) {
  const [notifications] = useState(3);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const userDetails = getUserDetails(userRole, userName);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
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
          <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">Here's what's happening today</p>
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
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

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
                      <p className="font-bold text-base sm:text-lg truncate">{userName}</p>
                      <p className="text-xs sm:text-sm opacity-90 capitalize truncate">{userRole}</p>
                      {userDetails.title && (
                        <p className="text-xs opacity-75 truncate">{userDetails.title}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {/* Email */}
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-900 font-medium truncate">{userDetails.email}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-900 font-medium">{userDetails.phone}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-900 font-medium truncate">{userDetails.location}</span>
                  </div>

                  {/* Role-specific details */}
                  {userRole === 'coach' && (
                    <>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                        <Award className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">Rating: {userDetails.rating}/5.0</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                        <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">{userDetails.students} Active Students</span>
                      </div>
                    </>
                  )}

                  {userRole === 'student' && (
                    <>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                        <Award className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">Chess Rating: {userDetails.rating}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                        <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">Age: {userDetails.age} years</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                        <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 font-medium truncate">Coach: {userDetails.coach}</span>
                      </div>
                    </>
                  )}

                  {userRole === 'admin' && (
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                      <Award className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-900 font-medium">{userDetails.role}</span>
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
