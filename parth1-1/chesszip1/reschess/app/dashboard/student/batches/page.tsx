'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BatchChat from '@/components/dashboard/BatchChat';

export default function StudentBatchesPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="customer" />
      
      <div className="flex-1">
        <DashboardHeader userName="Student" userRole="customer" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            My Batch Chat
          </h1>
          <p className="text-gray-600 mb-6">
            Connect with your batch mates and coach in your group conversation
          </p>

          <BatchChat userRole="customer" userName="Student" />
        </main>
      </div>
    </div>
  );
}
