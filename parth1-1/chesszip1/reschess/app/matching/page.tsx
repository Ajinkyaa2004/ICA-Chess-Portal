'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { Star, Languages, Clock, Award, CheckCircle } from 'lucide-react';

const suggestedCoaches = [
  {
    id: '1',
    name: 'IM Ramesh Kumar',
    rating: 2500,
    experience: 8,
    specialization: ['Openings', 'Tactics', 'Endgames'],
    languages: ['English', 'Hindi', 'Tamil'],
    hourlyRate: 1500,
    matchScore: 95,
    avatar: '',
  },
  {
    id: '2',
    name: 'FM Priya Sharma',
    rating: 2400,
    experience: 5,
    specialization: ['Positional Play', 'Strategy'],
    languages: ['English', 'Hindi'],
    hourlyRate: 1200,
    matchScore: 88,
    avatar: '',
  },
  {
    id: '3',
    name: 'CM Aditya Verma',
    rating: 2200,
    experience: 3,
    specialization: ['Beginners', 'Tactics'],
    languages: ['English', 'Hindi', 'Bengali'],
    hourlyRate: 800,
    matchScore: 82,
    avatar: '',
  },
];

export default function MatchingPage() {
  const router = useRouter();
  const [studentProfile, setStudentProfile] = useState({
    rating: '1200',
    ageGroup: '10-12',
    language: 'Hindi',
    availability: 'Weekends',
    goals: 'Improve tactics',
  });
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);

  const handleAcceptMatch = () => {
    if (selectedCoach) {
      router.push('/dashboard/student');
    }
  };

  return (
    <div className="min-h-screen bg-primary-offwhite py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary-blue mb-2">
            Find Your Perfect Coach
          </h1>
          <p className="text-gray-600">AI-powered matching based on your preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-heading font-semibold mb-4">Student Profile</h3>
            <div className="space-y-4">
              <Input
                label="Current Rating"
                type="number"
                value={studentProfile.rating}
                onChange={(e) => setStudentProfile({ ...studentProfile, rating: e.target.value })}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
                <select
                  value={studentProfile.ageGroup}
                  onChange={(e) => setStudentProfile({ ...studentProfile, ageGroup: e.target.value })}
                  className="input-field"
                >
                  <option>6-8</option>
                  <option>8-10</option>
                  <option>10-12</option>
                  <option>12-15</option>
                  <option>15+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                <select
                  value={studentProfile.language}
                  onChange={(e) => setStudentProfile({ ...studentProfile, language: e.target.value })}
                  className="input-field"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Bengali</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={studentProfile.availability}
                  onChange={(e) => setStudentProfile({ ...studentProfile, availability: e.target.value })}
                  className="input-field"
                >
                  <option>Weekdays Morning</option>
                  <option>Weekdays Evening</option>
                  <option>Weekends</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2">
            <h3 className="text-2xl font-heading font-semibold mb-4">Suggested Coaches</h3>
            <div className="space-y-4">
              {suggestedCoaches.map((coach) => (
                <Card 
                  key={coach.id}
                  className={`transition-all ${
                    selectedCoach === coach.id ? 'ring-2 ring-primary-orange' : ''
                  }`}
                  hover
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {coach.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="text-xl font-heading font-semibold">{coach.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span>Rating: {coach.rating}</span>
                              <span>•</span>
                              <span>{coach.experience} years exp</span>
                            </div>
                          </div>
                          <Badge variant="success">{coach.matchScore}% Match</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-600 mb-1 flex items-center">
                              <Award className="w-3 h-3 mr-1" />
                              Specialization
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {coach.specialization.map((spec) => (
                                <Badge key={spec} variant="info">{spec}</Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 mb-1 flex items-center">
                              <Languages className="w-3 h-3 mr-1" />
                              Languages
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {coach.languages.map((lang) => (
                                <Badge key={lang} variant="default">{lang}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">₹{coach.hourlyRate}/hour</span>
                          </div>

                          <div className="flex gap-2">
                            {selectedCoach === coach.id ? (
                              <Button size="sm" onClick={handleAcceptMatch}>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept Match
                              </Button>
                            ) : (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedCoach(coach.id)}
                                >
                                  Select
                                </Button>
                                <Button size="sm" variant="ghost">View Profile</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
