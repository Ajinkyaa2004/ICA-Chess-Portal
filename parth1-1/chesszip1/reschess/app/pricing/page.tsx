'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Check, X } from 'lucide-react';

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 2999,
    lessonsPerMonth: 4,
    features: [
      '4 lessons per month',
      'Basic progress tracking',
      'Email support',
      'Access to study materials',
      'Lesson recordings',
    ],
    notIncluded: [
      'Priority scheduling',
      'Personalized study plan',
      'Tournament preparation',
      'Direct coach messaging',
    ],
  },
  {
    id: 'club',
    name: 'Club',
    price: 4999,
    lessonsPerMonth: 8,
    popular: true,
    features: [
      '8 lessons per month',
      'Advanced progress analytics',
      'Priority email support',
      'Full resource library',
      'Lesson recordings',
      'Priority scheduling',
      'Personalized study plan',
      'Direct coach messaging',
    ],
    notIncluded: [
      'Tournament preparation',
      'Unlimited lessons',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 8999,
    lessonsPerMonth: 16,
    features: [
      '16 lessons per month',
      'Premium analytics dashboard',
      '24/7 priority support',
      'Exclusive resources',
      'Lesson recordings',
      'Priority scheduling',
      'Personalized study plan',
      'Tournament preparation',
      'Direct coach messaging',
      'Monthly progress reports',
      'Game analysis sessions',
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="min-h-screen bg-primary-offwhite">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="text-lg sm:text-2xl font-heading font-bold text-primary-blue truncate">
              Indian Chess Academy
            </Link>
            <Link href="/auth/login" className="text-sm sm:text-base text-primary-blue hover:text-primary-orange flex-shrink-0">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-blue mb-3 sm:mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Flexible pricing for every chess enthusiast
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                  billingCycle === 'monthly'
                    ? 'bg-primary-orange text-white'
                    : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                  billingCycle === 'annual'
                    ? 'bg-primary-orange text-white'
                    : 'text-gray-600'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative ${
                  pkg.popular ? 'ring-2 ring-primary-orange lg:transform lg:scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-orange text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary-blue mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-blue">
                      ₹{billingCycle === 'annual' ? Math.round(pkg.price * 0.8) : pkg.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-600">/month</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">{pkg.lessonsPerMonth} lessons per month</p>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {pkg.notIncluded.map((feature, idx) => (
                    <div key={idx} className="flex items-start opacity-50">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={pkg.popular ? 'primary' : 'outline'}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-3 sm:mb-4">
              Not sure which plan is right for you?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Book a free demo lesson and we'll help you choose the perfect plan
            </p>
            <Link href="/booking/demo">
              <Button size="lg">Book Free Demo</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
