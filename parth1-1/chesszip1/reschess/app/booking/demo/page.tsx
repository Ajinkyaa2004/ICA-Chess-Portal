'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Toast, { ToastType } from '@/components/ui/Toast';
import { Calendar, Clock, User, Globe, Phone } from 'lucide-react';

const coaches = [
  { id: 'auto-assign', name: 'Request Coach Assignment', rating: 0 },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
];

// Country data with phone codes and multiple timezones
const countries = [
  { 
    code: 'IN', 
    name: 'India', 
    phoneCode: '+91', 
    flag: '🇮🇳',
    timezones: [
      { value: 'Asia/Kolkata', label: 'IST (UTC+5:30)', city: 'Mumbai/Delhi' }
    ]
  },
  { 
    code: 'US', 
    name: 'United States', 
    phoneCode: '+1', 
    flag: '🇺🇸',
    timezones: [
      { value: 'America/New_York', label: 'EST (UTC-5:00)', city: 'New York/Boston' },
      { value: 'America/Chicago', label: 'CST (UTC-6:00)', city: 'Chicago/Dallas' },
      { value: 'America/Denver', label: 'MST (UTC-7:00)', city: 'Denver/Phoenix' },
      { value: 'America/Los_Angeles', label: 'PST (UTC-8:00)', city: 'Los Angeles/Seattle' },
      { value: 'America/Anchorage', label: 'AKST (UTC-9:00)', city: 'Anchorage' },
      { value: 'Pacific/Honolulu', label: 'HST (UTC-10:00)', city: 'Honolulu' }
    ]
  },
  { 
    code: 'GB', 
    name: 'United Kingdom', 
    phoneCode: '+44', 
    flag: '🇬🇧',
    timezones: [
      { value: 'Europe/London', label: 'GMT (UTC+0:00)', city: 'London' }
    ]
  },
  { 
    code: 'CA', 
    name: 'Canada', 
    phoneCode: '+1', 
    flag: '🇨🇦',
    timezones: [
      { value: 'America/St_Johns', label: 'NST (UTC-3:30)', city: 'St. Johns' },
      { value: 'America/Halifax', label: 'AST (UTC-4:00)', city: 'Halifax' },
      { value: 'America/Toronto', label: 'EST (UTC-5:00)', city: 'Toronto/Montreal' },
      { value: 'America/Winnipeg', label: 'CST (UTC-6:00)', city: 'Winnipeg' },
      { value: 'America/Edmonton', label: 'MST (UTC-7:00)', city: 'Calgary/Edmonton' },
      { value: 'America/Vancouver', label: 'PST (UTC-8:00)', city: 'Vancouver' }
    ]
  },
  { 
    code: 'AU', 
    name: 'Australia', 
    phoneCode: '+61', 
    flag: '🇦🇺',
    timezones: [
      { value: 'Australia/Perth', label: 'AWST (UTC+8:00)', city: 'Perth' },
      { value: 'Australia/Darwin', label: 'ACST (UTC+9:30)', city: 'Darwin' },
      { value: 'Australia/Adelaide', label: 'ACDT (UTC+10:30)', city: 'Adelaide' },
      { value: 'Australia/Sydney', label: 'AEDT (UTC+11:00)', city: 'Sydney/Melbourne' },
      { value: 'Australia/Brisbane', label: 'AEST (UTC+10:00)', city: 'Brisbane' }
    ]
  },
  { 
    code: 'AE', 
    name: 'United Arab Emirates', 
    phoneCode: '+971', 
    flag: '🇦🇪',
    timezones: [
      { value: 'Asia/Dubai', label: 'GST (UTC+4:00)', city: 'Dubai/Abu Dhabi' }
    ]
  },
  { 
    code: 'SG', 
    name: 'Singapore', 
    phoneCode: '+65', 
    flag: '🇸🇬',
    timezones: [
      { value: 'Asia/Singapore', label: 'SGT (UTC+8:00)', city: 'Singapore' }
    ]
  },
  { 
    code: 'DE', 
    name: 'Germany', 
    phoneCode: '+49', 
    flag: '🇩🇪',
    timezones: [
      { value: 'Europe/Berlin', label: 'CET (UTC+1:00)', city: 'Berlin/Munich' }
    ]
  },
  { 
    code: 'FR', 
    name: 'France', 
    phoneCode: '+33', 
    flag: '🇫🇷',
    timezones: [
      { value: 'Europe/Paris', label: 'CET (UTC+1:00)', city: 'Paris' }
    ]
  },
  { 
    code: 'JP', 
    name: 'Japan', 
    phoneCode: '+81', 
    flag: '🇯🇵',
    timezones: [
      { value: 'Asia/Tokyo', label: 'JST (UTC+9:00)', city: 'Tokyo/Osaka' }
    ]
  },
  { 
    code: 'BR', 
    name: 'Brazil', 
    phoneCode: '+55', 
    flag: '🇧🇷',
    timezones: [
      { value: 'America/Sao_Paulo', label: 'BRT (UTC-3:00)', city: 'São Paulo/Rio' },
      { value: 'America/Manaus', label: 'AMT (UTC-4:00)', city: 'Manaus' },
      { value: 'America/Fortaleza', label: 'BRT (UTC-3:00)', city: 'Fortaleza' }
    ]
  },
  { 
    code: 'RU', 
    name: 'Russia', 
    phoneCode: '+7', 
    flag: '🇷🇺',
    timezones: [
      { value: 'Europe/Moscow', label: 'MSK (UTC+3:00)', city: 'Moscow' },
      { value: 'Asia/Yekaterinburg', label: 'YEKT (UTC+5:00)', city: 'Yekaterinburg' },
      { value: 'Asia/Novosibirsk', label: 'NOVT (UTC+7:00)', city: 'Novosibirsk' },
      { value: 'Asia/Vladivostok', label: 'VLAT (UTC+10:00)', city: 'Vladivostok' }
    ]
  },
];

export default function DemoBookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to India
  const [selectedTimezone, setSelectedTimezone] = useState(countries[0].timezones[0]);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    parentEmail: '',
    parentPhone: '',
    preferredDate: '',
    preferredTimes: [] as string[], // Changed to array for multiple selections
    coachId: 'auto-assign',
    timezone: countries[0].timezones[0].value,
    timezoneLabel: countries[0].timezones[0].label,
    studentAge: '',
    authMethod: 'magic-link', // 'magic-link' or 'password'
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      // Set first timezone as default
      const defaultTimezone = country.timezones[0];
      setSelectedTimezone(defaultTimezone);
      setFormData({
        ...formData,
        timezone: defaultTimezone.value,
        timezoneLabel: defaultTimezone.label,
        parentPhone: '', // Clear phone number when country changes
      });
    }
  };

  const handleTimezoneChange = (timezoneValue: string) => {
    const timezone = selectedCountry.timezones.find(tz => tz.value === timezoneValue);
    if (timezone) {
      setSelectedTimezone(timezone);
      setFormData({
        ...formData,
        timezone: timezone.value,
        timezoneLabel: timezone.label,
      });
    }
  };

  const handleTimeSlotToggle = (time: string) => {
    const currentTimes = formData.preferredTimes;
    const isSelected = currentTimes.includes(time);
    
    if (isSelected) {
      // Remove time if already selected
      setFormData({
        ...formData,
        preferredTimes: currentTimes.filter(t => t !== time)
      });
    } else {
      // Add time if not selected
      setFormData({
        ...formData,
        preferredTimes: [...currentTimes, time]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one time slot is selected
    if (formData.preferredTimes.length === 0) {
      setToast({ message: 'Please select at least one preferred time slot', type: 'error' });
      return;
    }

    // Validate age
    const parsedAge = parseInt(formData.studentAge);
    if (!formData.studentAge || isNaN(parsedAge) || parsedAge < 3 || parsedAge > 100) {
      setToast({ message: 'Please go back and enter a valid student age (3–100)', type: 'error' });
      return;
    }
    
    // Validate password if password method selected
    if (formData.authMethod === 'password') {
      if (formData.password.length < 8) {
        setToast({ message: 'Password must be at least 8 characters', type: 'error' });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setToast({ message: 'Passwords do not match', type: 'error' });
        return;
      }
    }
    
    setIsLoading(true);

    try {
      const res = await fetch('/api/public/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: formData.studentName,
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          parentPhone: `${selectedCountry.phoneCode}${formData.parentPhone}`,
          age: parsedAge,
          country: selectedCountry.name,
          timezone: formData.timezone,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTimes[0],
          authMethod: formData.authMethod,
          password: formData.authMethod === 'password' ? formData.password : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setToast({ message: data.error || 'Booking failed. Please try again.', type: 'error' });
        setIsLoading(false);
        return;
      }
      setToast({
        message: formData.authMethod === 'magic-link'
          ? 'Demo booked! Check your email for the login link.'
          : 'Demo booked successfully!',
        type: 'success'
      });
      setTimeout(() => router.push('/booking/demo/success'), 1500);
    } catch {
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-offwhite py-12 px-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary-blue mb-2">
            Book Your Free Demo
          </h1>
          <p className="text-gray-600">Experience world-class chess coaching</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {[
              { num: 1, label: 'Info' },
              { num: 2, label: 'Schedule' },
              { num: 3, label: 'Coach' },
              { num: 4, label: 'Account' }
            ].map((s, idx, arr) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                      step >= s.num ? 'bg-primary-orange text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className={`text-xs mt-1 ${step >= s.num ? 'text-primary-orange font-semibold' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-1 mx-1 ${step > s.num ? 'bg-primary-orange' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-heading font-semibold mb-4">Parent & Student Information</h2>
                
                {/* Country Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline w-4 h-4 mr-1" />
                    Country
                  </label>
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="input-field"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} ({country.phoneCode})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timezone Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Select Your Timezone
                  </label>
                  <select
                    value={selectedTimezone.value}
                    onChange={(e) => handleTimezoneChange(e.target.value)}
                    className="input-field"
                  >
                    {selectedCountry.timezones.map((timezone) => (
                      <option key={timezone.value} value={timezone.value}>
                        {timezone.label} - {timezone.city}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedCountry.timezones.length > 1 
                      ? `${selectedCountry.name} has multiple timezones. Please select the one closest to you.`
                      : `Selected timezone for ${selectedCountry.name}`
                    }
                  </p>
                </div>

                {/* Timezone Confirmation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-blue-900">Selected Timezone</p>
                      <p className="text-xs sm:text-sm text-blue-700 truncate">
                        {selectedTimezone.label} • {selectedTimezone.city} • {selectedTimezone.value}
                      </p>
                    </div>
                  </div>
                </div>
                
                <Input
                  label="Parent Name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  required
                />

                <Input
                  label="Student Name"
                  type="text"
                  placeholder="Enter student's full name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                />

                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="Student Age"
                    type="number"
                    placeholder="Age"
                    value={formData.studentAge}
                    onChange={(e) => setFormData({ ...formData, studentAge: e.target.value })}
                    required
                  />
                </div>

                <Input
                  label="Parent Email"
                  type="email"
                  placeholder="parent@example.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  required
                />

                {/* Enhanced Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Parent Phone
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-sm sm:text-base min-h-[44px]">
                      <span className="mr-2">{selectedCountry.flag}</span>
                      <span className="font-medium text-gray-700">{selectedCountry.phoneCode}</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="XXXXX XXXXX"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent min-h-[44px]"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your phone number without the country code
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-heading font-semibold mb-4">Schedule Your Demo</h2>

                {/* Timezone Display */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-green-900">Your Selected Timezone</p>
                      <p className="text-xs sm:text-sm text-green-700 truncate">
                        {selectedCountry.flag} {selectedCountry.name} • {selectedTimezone.label} • {selectedTimezone.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Preferred Times ({selectedTimezone.label})
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Select all time slots that work for you. This helps us find the best available slot.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => {
                      const isSelected = formData.preferredTimes.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSlotToggle(time)}
                          className={`py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all border-2 ${
                            isSelected
                              ? 'bg-primary-orange text-white border-primary-orange'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-primary-orange hover:bg-orange-50'
                          }`}
                        >
                          <div className="flex items-center justify-center space-x-1">
                            {isSelected && (
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span>{time}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {formData.preferredTimes.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Selected times:</strong> {formData.preferredTimes.join(', ')}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {formData.preferredTimes.length} time slot{formData.preferredTimes.length !== 1 ? 's' : ''} selected
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    All times are shown in your selected timezone: {selectedTimezone.label} ({selectedTimezone.city})
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl font-heading font-semibold mb-4">Coach Assignment</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Automatic Coach Assignment</h3>
                      <p className="text-sm text-blue-800">
                        Our admin team will assign the best available coach based on your student&apos;s age, 
                        preferred time slots, and learning goals. This ensures the perfect match for your demo session.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {coaches.map((coach) => (
                    <button
                      key={coach.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, coachId: coach.id })}
                      className={`w-full p-4 sm:p-6 rounded-lg border-2 transition-all text-left ${
                        formData.coachId === coach.id
                          ? 'border-primary-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-orange rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-lg sm:text-xl text-primary-blue mb-1">
                              {coach.name}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                              Let our admin team match you with the perfect coach for your demo session
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✓ Expert Matching
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                ✓ Best Availability
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                ✓ Personalized
                              </span>
                            </div>
                          </div>
                        </div>
                        {formData.coachId === coach.id && (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-orange rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <span className="text-primary-orange font-bold mr-2">1.</span>
                      You&apos;ll receive a confirmation email with your demo details
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-orange font-bold mr-2">2.</span>
                      Our admin team will assign the best coach within 24 hours
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-orange font-bold mr-2">3.</span>
                      You'll get an email with your coach details and meeting link
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <h3 className="font-semibold text-primary-blue mb-2 flex items-center text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Your Account Will Be Created
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    An account will be created for <strong className="break-all">{formData.parentEmail}</strong> to access your demo session and future dashboard.
                  </p>
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-semibold mb-4">Setup Your Login</h2>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Authentication Method
                  </label>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, authMethod: 'magic-link' })}
                      className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                        formData.authMethod === 'magic-link'
                          ? 'border-primary-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          formData.authMethod === 'magic-link' ? 'border-primary-orange bg-primary-orange' : 'border-gray-300'
                        }`}>
                          {formData.authMethod === 'magic-link' && (
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary-blue text-sm sm:text-base">Magic Link (Recommended)</p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Receive a secure login link via email. No password to remember.
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, authMethod: 'password' })}
                      className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                        formData.authMethod === 'password'
                          ? 'border-primary-orange bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          formData.authMethod === 'password' ? 'border-primary-orange bg-primary-orange' : 'border-gray-300'
                        }`}>
                          {formData.authMethod === 'password' && (
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary-blue text-sm sm:text-base">Set Password</p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            Create a password for traditional email/password login.
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {formData.authMethod === 'password' && (
                    <div className="space-y-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                      <Input
                        label="Create Password"
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                      {formData.password && (
                        <div className="text-sm">
                          <p className="text-gray-600 mb-2">Password strength:</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                formData.password.length >= 12
                                  ? 'bg-green-600 w-full'
                                  : formData.password.length >= 8
                                  ? 'bg-yellow-500 w-2/3'
                                  : 'bg-red-500 w-1/3'
                              }`}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 sm:pt-6 border-t">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="w-full sm:w-auto"
                >
                  Previous
                </Button>
              )}
              
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => {
                    // Validate step 1 (student info) before proceeding
                    if (step === 1) {
                      if (!formData.studentName.trim() || !formData.parentName.trim() || !formData.parentEmail.trim() || !formData.parentPhone.trim()) {
                        setToast({ message: 'Please fill in all required fields', type: 'error' });
                        return;
                      }
                      const age = parseInt(formData.studentAge);
                      if (!formData.studentAge || isNaN(age) || age < 3 || age > 100) {
                        setToast({ message: 'Please enter a valid student age (3–100)', type: 'error' });
                        return;
                      }
                    }
                    // Validate step 2 (scheduling) before proceeding
                    if (step === 2 && formData.preferredTimes.length === 0) {
                      setToast({ message: 'Please select at least one preferred time slot', type: 'error' });
                      return;
                    }
                    setStep(step + 1);
                  }}
                  className={`w-full sm:w-auto ${step === 1 ? 'sm:ml-auto' : ''}`}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full sm:w-auto sm:ml-auto"
                >
                  Create Account & Book Demo
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
