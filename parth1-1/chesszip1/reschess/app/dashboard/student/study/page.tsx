'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { BookOpen, FileText, Video, Download } from 'lucide-react';

const studyMaterials = [
  {
    id: 1,
    title: 'Sicilian Defense - Complete Guide',
    type: 'PDF',
    category: 'Openings',
    size: '2.4 MB',
    assignedBy: 'IM Ramesh Kumar',
    dueDate: '2026-01-20'
  },
  {
    id: 2,
    title: 'Tactical Patterns - Beginner Level',
    type: 'PDF',
    category: 'Tactics',
    size: '1.8 MB',
    assignedBy: 'IM Ramesh Kumar',
    dueDate: '2026-01-18'
  },
  {
    id: 3,
    title: 'Endgame Fundamentals Video',
    type: 'Video',
    category: 'Endgames',
    size: '45 MB',
    assignedBy: 'FM Priya Sharma',
    dueDate: '2026-01-22'
  },
  {
    id: 4,
    title: 'Chess Notation Practice',
    type: 'PDF',
    category: 'Basics',
    size: '856 KB',
    assignedBy: 'IM Ramesh Kumar',
    dueDate: '2026-01-17'
  },
];

export default function StudentStudyPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="flex-1">
        <DashboardHeader userName="Arjun Patel" userRole="student" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            Study Material
          </h1>

          <Card>
            <h3 className="text-xl font-heading font-semibold mb-4">Assigned Materials</h3>
            <div className="space-y-3">
              {studyMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-primary-offwhite rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-orange bg-opacity-10 rounded-lg flex items-center justify-center">
                      {material.type === 'PDF' && <FileText className="w-6 h-6 text-primary-orange" />}
                      {material.type === 'Video' && <Video className="w-6 h-6 text-primary-orange" />}
                    </div>
                    <div>
                      <p className="font-semibold">{material.title}</p>
                      <p className="text-sm text-gray-600">Assigned by: {material.assignedBy}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="info">{material.category}</Badge>
                        <Badge variant="default">{material.type}</Badge>
                        <span className="text-xs text-gray-500">{material.size}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(material.dueDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
