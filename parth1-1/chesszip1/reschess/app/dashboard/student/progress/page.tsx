'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import { Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Attendance data over months
const attendanceData = [
  { month: 'Sep', attended: 7, total: 8, percentage: 87.5 },
  { month: 'Oct', attended: 8, total: 8, percentage: 100 },
  { month: 'Nov', attended: 6, total: 8, percentage: 75 },
  { month: 'Dec', attended: 7, total: 8, percentage: 87.5 },
  { month: 'Jan', attended: 7, total: 8, percentage: 87.5 },
];

// Overall progress based on attendance and study material accessed
const overallProgressData = [
  { month: 'Sep', attendance: 87.5, studyMaterial: 60 },
  { month: 'Oct', attendance: 100, studyMaterial: 75 },
  { month: 'Nov', attendance: 75, studyMaterial: 65 },
  { month: 'Dec', attendance: 87.5, studyMaterial: 80 },
  { month: 'Jan', attendance: 87.5, studyMaterial: 85 },
];

// Calculate overall statistics
const totalSessions = 40;
const attendedSessions = 35;
const attendancePercentage = ((attendedSessions / totalSessions) * 100).toFixed(1);
const studyMaterialsAssigned = 20;
const studyMaterialsAccessed = 17;
const studyMaterialPercentage = ((studyMaterialsAccessed / studyMaterialsAssigned) * 100).toFixed(1);
const overallProgress = ((parseFloat(attendancePercentage) + parseFloat(studyMaterialPercentage)) / 2).toFixed(1);

export default function StudentProgressPage() {
  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="flex-1">
        <DashboardHeader userName="Arjun Patel" userRole="student" />
        
        <main className="p-6">
          <h1 className="text-3xl font-heading font-bold text-primary-blue mb-6">
            My Progress
          </h1>

          {/* Progress Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Attendance Progress */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Attendance Rate</p>
                  <p className="text-4xl font-bold text-primary-blue">{attendancePercentage}%</p>
                  <p className="text-gray-500 text-sm mt-1">{attendedSessions} of {totalSessions} sessions</p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${attendancePercentage}%` }}
                />
              </div>
            </Card>

            {/* Study Material Progress */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Study Material</p>
                  <p className="text-4xl font-bold text-primary-blue">{studyMaterialPercentage}%</p>
                  <p className="text-gray-500 text-sm mt-1">{studyMaterialsAccessed} of {studyMaterialsAssigned} accessed</p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${studyMaterialPercentage}%` }}
                />
              </div>
            </Card>

            {/* Overall Progress */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm">Overall Progress</p>
                  <p className="text-4xl font-bold text-primary-orange">{overallProgress}%</p>
                  <p className="text-gray-500 text-sm mt-1">Combined score</p>
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary-orange" />
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-orange h-3 rounded-full transition-all"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </Card>
          </div>

          {/* Graphs Side by Side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Attendance Graph */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Monthly Attendance</h3>
              <p className="text-sm text-gray-600 mb-4">Track your session attendance over time</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} label={{ value: 'Attendance %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value: any, name: string) => {
                      if (name === 'percentage') return [`${value}%`, 'Attendance'];
                      return [value, name];
                    }}
                  />
                  <Bar dataKey="percentage" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                {attendanceData.map((data) => (
                  <div key={data.month} className="p-2 bg-primary-offwhite rounded-lg">
                    <p className="text-xs text-gray-600">{data.month}</p>
                    <p className="text-sm font-semibold text-primary-blue">{data.attended}/{data.total}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Overall Progress Graph */}
            <Card>
              <h3 className="text-xl font-heading font-semibold mb-4">Overall Progress Trend</h3>
              <p className="text-sm text-gray-600 mb-4">Combined view of attendance and study material access</p>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={overallProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} label={{ value: 'Progress %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: any) => `${value}%`} />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', r: 6 }}
                    name="Attendance"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="studyMaterial" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 6 }}
                    name="Study Material"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Attendance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Study Material</span>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
