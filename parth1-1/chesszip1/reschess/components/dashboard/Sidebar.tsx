'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  CreditCard, 
  MessageSquare, 
  BookOpen, 
  TrendingUp,
  Video,
  Menu,
  X,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
}

const menuItems: Record<UserRole, Array<{
  icon: any;
  label: string;
  href: string;
}>> = {
  customer: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/student' },
    { icon: Calendar, label: 'My Lessons', href: '/dashboard/student/lessons' },
    { icon: TrendingUp, label: 'My Progress', href: '/dashboard/student/progress' },
    { icon: BookOpen, label: 'Study Material', href: '/dashboard/student/study' },
    { icon: Users, label: 'Batch Chat', href: '/dashboard/student/batches' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/student/billing' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/student/messages' },
    { icon: MessageSquare, label: 'Announcements', href: '/dashboard/student/broadcast' },
  ],
  coach: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/coach' },
    { icon: Users, label: 'Students', href: '/dashboard/coach/students' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/coach/schedule' },
    { icon: Users, label: 'Batch Chat', href: '/dashboard/coach/batches' },
    { icon: CreditCard, label: 'Earnings', href: '/dashboard/coach/earnings' },
    { icon: BookOpen, label: 'Resources', href: '/dashboard/coach/resources' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/coach/messages' },
    { icon: MessageSquare, label: 'Broadcast', href: '/dashboard/coach/broadcast' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/admin' },
    { icon: Video, label: 'Demos', href: '/dashboard/admin/demos' },
    { icon: Users, label: 'Students', href: '/dashboard/admin/students' },
    { icon: GraduationCap, label: 'Coaches', href: '/dashboard/admin/coaches' },
    { icon: UserCheck, label: 'Batches', href: '/dashboard/admin/batches' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/admin/schedule' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/admin/payments' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/admin/messages' },
    { icon: MessageSquare, label: 'Broadcast', href: '/dashboard/admin/broadcast' },
    { icon: TrendingUp, label: 'Analytics', href: '/dashboard/admin/analytics' },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = menuItems[role] || [];
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and auto-open on desktop
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsOpen(!mobile); // Open by default on desktop, closed on mobile
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-primary-orange text-white rounded-lg shadow-lg hover:bg-orange-600 transition-all lg:hidden"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Desktop Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:block fixed top-4 left-4 z-50 p-2 bg-primary-orange text-white rounded-lg shadow-lg hover:bg-orange-600 transition-all"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out z-40 w-64 sm:w-72 lg:w-64 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-gray-200 mt-14 sm:mt-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image 
              src="/imgs.png" 
              alt="Indian Chess Academy" 
              className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 object-contain"
            width={80} height={80} />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-heading font-bold text-primary-blue truncate">ICA</h1>
              <p className="text-xs text-gray-600 capitalize truncate">
                {role === 'customer' ? 'Student Portal' :
                 role === 'coach' ? 'Coach Portal' :
                 'Admin Portal'}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <ul className="space-y-1 sm:space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all min-h-[44px] ${
                      isActive
                        ? 'bg-primary-orange text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Spacer for desktop to prevent content overlap */}
      <div
        className={`hidden lg:block transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        }`}
      />
    </>
  );
}
