import { NextResponse } from 'next/server';

// GET /api/public/pricing — Return static pricing data (NO AUTH)
export async function GET() {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for beginners who want to learn the basics of chess',
      price: 999,
      currency: 'INR',
      interval: 'monthly',
      features: [
        '4 group sessions per month',
        'Access to beginner study materials',
        'Basic puzzle practice',
        'Monthly progress report',
      ],
      popular: false,
    },
    {
      id: 'club',
      name: 'Club',
      description: 'For intermediate players looking to improve their game',
      price: 1999,
      currency: 'INR',
      interval: 'monthly',
      features: [
        '8 group sessions per month',
        'Access to all study materials',
        'Advanced puzzle practice',
        'Weekly progress reports',
        'Tournament preparation',
        '1 one-on-one session per month',
      ],
      popular: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For serious players aiming for competitive excellence',
      price: 3999,
      currency: 'INR',
      interval: 'monthly',
      features: [
        '12 sessions per month (mix of group and 1-on-1)',
        'Access to all study materials and archives',
        'Unlimited puzzle practice',
        'Daily progress tracking',
        'Tournament preparation and analysis',
        '4 one-on-one sessions per month',
        'Game analysis with coach',
        'Priority scheduling',
      ],
      popular: false,
    },
  ];

  return NextResponse.json({
    success: true,
    data: plans,
  });
}
