import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <Image 
                src="/imgs.png" 
                alt="Indian Chess Academy" 
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0 object-contain"
              width={80} height={80} />
              <h1 className="text-lg sm:text-2xl font-heading font-bold text-primary-blue truncate">
                Indian Chess Academy
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Link 
                href="/auth/login" 
                className="text-sm sm:text-base text-primary-blue hover:text-primary-orange font-medium px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 transition-all"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="btn-primary text-xs sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-blue to-primary-olive text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image 
              src="/imgs.png" 
              alt="Indian Chess Academy" 
              className="mx-auto w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mb-4 sm:mb-6 object-contain"
            width={80} height={80} />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 px-4">
              Master Chess with India's Best
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-100 px-4">
              Structured learning. Expert coaches. Proven results.
            </p>
            <Link href="/booking/demo" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-block">
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-center mb-8 sm:mb-12 text-primary-blue">
            Why Choose ICA?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Trophy, title: 'Expert Coaches', desc: 'Learn from FIDE-rated masters and experienced trainers' },
              { icon: Users, title: 'Personalized Matching', desc: 'AI-powered coach matching based on your goals and style' },
              { icon: Calendar, title: 'Flexible Scheduling', desc: 'Book lessons at your convenience with automated scheduling' },
              { icon: TrendingUp, title: 'Track Progress', desc: 'Detailed analytics and performance tracking' },
            ].map((item, idx) => (
              <div key={idx} className="card text-center hover:shadow-md transition-shadow">
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-primary-orange" />
                <h3 className="text-lg sm:text-xl font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 bg-primary-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-center mb-8 sm:mb-12 text-primary-blue">
            How ICA Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: '1', title: 'Book', desc: 'Schedule a free demo lesson' },
              { step: '2', title: 'Match', desc: 'Get paired with the perfect coach' },
              { step: '3', title: 'Learn', desc: 'Attend structured lessons' },
              { step: '4', title: 'Improve', desc: 'Track progress and level up' },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-orange text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-primary-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mb-4 sm:mb-6">
            Ready to Start Your Chess Journey?
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">
            Join hundreds of students improving their game every day
          </p>
          <Link href="/booking/demo" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-block">
            Book Your Free Demo Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-3 sm:mb-4">Indian Chess Academy</h3>
              <p className="text-sm sm:text-base text-gray-400">Professional chess training for all levels</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/coaches">Our Coaches</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Support</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Contact</h4>
              <p className="text-sm sm:text-base text-gray-400">contact@indianchessacademy.com</p>
              <p className="text-sm sm:text-base text-gray-400">+91 XXX XXX XXXX</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-400">
            <p>&copy; 2026 Indian Chess Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
