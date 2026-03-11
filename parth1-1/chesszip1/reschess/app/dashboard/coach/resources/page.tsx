'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ChevronLeft, Upload, FileText, Image as ImageIcon, Video, Download, Trash2, Eye, Calendar } from 'lucide-react';

// Mock batches
const batches = [
  { id: 1, name: 'Beginners Batch A', level: 'Beginner' },
  { id: 2, name: 'Intermediate Batch B', level: 'Intermediate' },
  { id: 3, name: '1-1 Sessions', level: 'Mixed' },
];

// Mock resources
const initialResources = [
  {
    id: 1,
    batchId: 1,
    title: 'Chess Fundamentals - Week 1',
    type: 'lesson',
    fileType: 'pdf',
    fileName: 'Chess_Fundamentals_Week1.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '2026-01-15T10:00:00',
    description: 'Introduction to chess pieces and basic movements',
  },
  {
    id: 2,
    batchId: 1,
    title: 'Homework: Basic Tactics',
    type: 'homework',
    fileType: 'pdf',
    fileName: 'Basic_Tactics_Homework.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '2026-01-15T14:00:00',
    description: 'Practice problems on forks, pins, and skewers',
  },
  {
    id: 3,
    batchId: 1,
    title: 'Opening Strategy Diagram',
    type: 'material',
    fileType: 'image',
    fileName: 'Opening_Strategy.png',
    fileSize: '850 KB',
    uploadedAt: '2026-01-16T09:00:00',
    description: 'Visual guide to common opening principles',
  },
  {
    id: 4,
    batchId: 2,
    title: 'Intermediate Tactics - Week 1',
    type: 'lesson',
    fileType: 'pdf',
    fileName: 'Intermediate_Tactics_W1.pdf',
    fileSize: '3.2 MB',
    uploadedAt: '2026-01-14T11:00:00',
    description: 'Advanced tactical patterns and combinations',
  },
  {
    id: 5,
    batchId: 2,
    title: 'Recorded Session: Sicilian Defense',
    type: 'video',
    fileType: 'video',
    fileName: 'Sicilian_Defense_Recording.mp4',
    fileSize: '125 MB',
    uploadedAt: '2026-01-16T16:00:00',
    description: 'Full session recording on Sicilian Defense variations',
  },
  {
    id: 6,
    batchId: 3,
    title: 'Endgame Study Materials',
    type: 'material',
    fileType: 'pdf',
    fileName: 'Endgame_Studies.pdf',
    fileSize: '4.1 MB',
    uploadedAt: '2026-01-13T10:00:00',
    description: 'Collection of important endgame positions',
  },
];

export default function CoachResourcesPage() {
  const [resources, setResources] = useState(initialResources);
  const [selectedBatch, setSelectedBatch] = useState<string | number | null>(null);
  const [apiBatches, setApiBatches] = useState<any[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    batchId: 1,
    title: '',
    type: 'lesson' as 'lesson' | 'homework' | 'material' | 'video',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/coach/batches').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.data || json?.batches) setApiBatches(json.data || json.batches);
    }).catch(() => {});
    fetch('/api/study-materials').then(r => r.ok ? r.json() : null).then(json => {
      if (json?.materials?.length > 0) {
        setResources(json.materials.map((m: any) => ({
          id: m._id, batchId: m.batchId?._id || m.batchId,
          title: m.title, type: m.category || 'material',
          fileType: m.fileUrl?.match(/\.(png|jpg|jpeg|gif)$/i) ? 'image' : m.fileUrl?.match(/\.(mp4|webm)$/i) ? 'video' : 'pdf',
          fileName: m.title, fileSize: '', uploadedAt: m.createdAt || '', description: m.description || '',
        })));
      }
    }).catch(() => {});
  }, []);

  const displayBatches = apiBatches.length > 0
    ? apiBatches.map((b: any) => ({ id: b._id, name: b.name, level: b.level || '' }))
    : batches;

  const filteredResources = selectedBatch 
    ? resources.filter(r => r.batchId === selectedBatch)
    : resources;

  const handleUpload = () => {
    if (!selectedFile || !uploadForm.title.trim()) return;

    const newResource = {
      id: resources.length + 1,
      batchId: uploadForm.batchId,
      title: uploadForm.title,
      type: uploadForm.type,
      fileType: selectedFile.type.startsWith('image/') ? 'image' : selectedFile.type.includes('video') ? 'video' : 'pdf',
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
      uploadedAt: new Date().toISOString(),
      description: uploadForm.description,
    };

    setResources([newResource, ...resources]);
    setUploadModalOpen(false);
    setUploadForm({ batchId: 1, title: '', type: 'lesson', description: '' });
    setSelectedFile(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'image') return <ImageIcon className="w-8 h-8 text-blue-600" />;
    if (fileType === 'video') return <Video className="w-8 h-8 text-purple-600" />;
    return <FileText className="w-8 h-8 text-red-600" />;
  };

  const getTypeBadge = (type: string) => {
    const variants: any = {
      lesson: 'info',
      homework: 'warning',
      material: 'success',
      video: 'danger',
    };
    return <Badge variant={variants[type]}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
  };

  return (
    <div className="flex min-h-screen bg-primary-offwhite overflow-x-hidden">
      <Sidebar role="coach" />
      
      <div className="flex-1">
        <DashboardHeader userName="Coach" userRole="coach" />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <Link href="/dashboard/coach">
              <Button variant="ghost" size="sm" className="mb-3">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-primary-blue mb-2">Learning Materials</h1>
                <p className="text-gray-600 text-sm sm:text-base">Upload lessons, homework, and study materials for your batches</p>
              </div>
              <Button onClick={() => setUploadModalOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Material
              </Button>
            </div>
          </div>

          {/* Batch Filter */}
          <Card className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 font-medium mr-2">Filter by Batch:</span>
              <Button
                variant={selectedBatch === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedBatch(null)}
              >
                All Batches ({resources.length})
              </Button>
              {displayBatches.map((batch: any) => {
                const count = resources.filter(r => r.batchId === batch.id).length;
                return (
                  <Button
                    key={batch.id}
                    variant={selectedBatch === batch.id ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedBatch(batch.id)}
                  >
                    {batch.name} ({count})
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs mb-1">Total Resources</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-blue">{filteredResources.length}</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs mb-1">Lessons</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {filteredResources.filter(r => r.type === 'lesson').length}
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs mb-1">Homework</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  {filteredResources.filter(r => r.type === 'homework').length}
                </p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-gray-600 text-xs mb-1">Videos</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                  {filteredResources.filter(r => r.type === 'video').length}
                </p>
              </div>
            </Card>
          </div>

          {/* Resources List */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map(resource => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    {/* File Icon */}
                    <div className="flex-shrink-0">
                      {getFileIcon(resource.fileType)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-base text-primary-blue truncate pr-2">{resource.title}</h4>
                        {getTypeBadge(resource.type)}
                      </div>

                      <p className="text-xs text-gray-600 mb-2">{resource.description}</p>

                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Badge variant="default" className="text-xs mr-2">
                          {displayBatches.find((b: any) => b.id === resource.batchId)?.name}
                        </Badge>
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(resource.uploadedAt).toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                          <FileText className="w-3 h-3 inline mr-1" />
                          {resource.fileName} • {resource.fileSize}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Resources Yet</h3>
              <p className="text-gray-600 mb-4">Upload your first lesson, homework, or study material</p>
              <Button onClick={() => setUploadModalOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Material
              </Button>
            </Card>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4">Upload Learning Material</h3>

            <div className="space-y-4">
              {/* Batch Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Batch *</label>
                <select
                  value={uploadForm.batchId}
                  onChange={(e) => setUploadForm({ ...uploadForm, batchId: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  {displayBatches.map((batch: any) => (
                    <option key={batch.id} value={batch.id}>{batch.name}</option>
                  ))}
                </select>
              </div>

              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="lesson">Lesson</option>
                  <option value="homework">Homework</option>
                  <option value="material">Study Material</option>
                  <option value="video">Video Recording</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g., Chess Fundamentals - Week 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Brief description of the material..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File *</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,image/*,video/*"
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-blue transition-colors"
                >
                  {selectedFile ? (
                    <div>
                      <FileText className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to select file</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, PPT, Images, Videos</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setUploadModalOpen(false);
                    setUploadForm({ batchId: 1, title: '', type: 'lesson', description: '' });
                    setSelectedFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpload}
                  disabled={!selectedFile || !uploadForm.title.trim()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
