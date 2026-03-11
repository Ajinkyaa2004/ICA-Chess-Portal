'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Toast, { ToastType } from '@/components/ui/Toast';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { Star, Heart, Send, Download } from 'lucide-react';

export default function ShowcasePage() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  return (
    <div className="min-h-screen bg-primary-offwhite py-12 px-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-primary-blue mb-4">
            Component Showcase
          </h1>
          <p className="text-xl text-gray-600">
            All reusable UI components in one place
          </p>
        </div>

        {/* Buttons */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">Buttons</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Star className="w-4 h-4 mr-2" />
                  Favorite
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="secondary">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button variant="ghost">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="default">Default</Badge>
          </div>
        </Card>

        {/* Inputs */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">Input Fields</h2>
          
          <div className="space-y-6 max-w-md">
            <Input
              label="Default Input"
              type="text"
              placeholder="Enter text..."
            />

            <Input
              label="Email Input"
              type="email"
              placeholder="you@example.com"
            />

            <Input
              label="Password Input"
              type="password"
              placeholder="••••••••"
            />

            <Input
              label="Input with Error"
              type="text"
              placeholder="Enter text..."
              error="This field is required"
            />

            <Input
              label="Disabled Input"
              type="text"
              placeholder="Disabled"
              disabled
            />
          </div>
        </Card>

        {/* Cards */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">Cards</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-2">Default Card</h3>
              <p className="text-gray-600">
                This is a default card with standard styling.
              </p>
            </Card>

            <Card hover>
              <h3 className="text-lg font-semibold mb-2">Hover Card</h3>
              <p className="text-gray-600">
                This card has a hover effect. Try hovering over it!
              </p>
            </Card>

            <Card className="bg-primary-blue text-white">
              <h3 className="text-lg font-semibold mb-2">Custom Card</h3>
              <p className="text-gray-100">
                Cards can be customized with additional classes.
              </p>
            </Card>
          </div>
        </Card>

        {/* Toasts */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">Toast Notifications</h2>
          
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setToast({ message: 'Success! Operation completed.', type: 'success' })}
              variant="primary"
            >
              Show Success
            </Button>
            <Button
              onClick={() => setToast({ message: 'Error! Something went wrong.', type: 'error' })}
              variant="secondary"
            >
              Show Error
            </Button>
            <Button
              onClick={() => setToast({ message: 'Warning! Please check your input.', type: 'warning' })}
              variant="outline"
            >
              Show Warning
            </Button>
            <Button
              onClick={() => setToast({ message: 'Info: New update available.', type: 'info' })}
              variant="ghost"
            >
              Show Info
            </Button>
          </div>
        </Card>

        {/* Loading Skeletons */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">Loading Skeletons</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Single Line</h3>
              <LoadingSkeleton className="h-4 w-full" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Multiple Lines</h3>
              <LoadingSkeleton className="h-4 w-full" count={3} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Card Skeleton</h3>
              <div className="space-y-3">
                <LoadingSkeleton className="h-32 w-full rounded-lg" />
                <LoadingSkeleton className="h-4 w-3/4" />
                <LoadingSkeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">Color Palette</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-24 bg-primary-blue rounded-lg mb-2"></div>
                  <p className="text-sm font-mono">#003366</p>
                  <p className="text-sm text-gray-600">Deep Blue</p>
                </div>
                <div>
                  <div className="h-24 bg-primary-orange rounded-lg mb-2"></div>
                  <p className="text-sm font-mono">#FC8A24</p>
                  <p className="text-sm text-gray-600">Orange</p>
                </div>
                <div>
                  <div className="h-24 bg-primary-offwhite border border-gray-300 rounded-lg mb-2"></div>
                  <p className="text-sm font-mono">#FFFEF3</p>
                  <p className="text-sm text-gray-600">Off-White</p>
                </div>
                <div>
                  <div className="h-24 bg-primary-olive rounded-lg mb-2"></div>
                  <p className="text-sm font-mono">#6B8E23</p>
                  <p className="text-sm text-gray-600">Olive Green</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Secondary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="h-24 bg-secondary-tan rounded-lg mb-2"></div>
                  <p className="text-sm font-mono">#B49885</p>
                  <p className="text-sm text-gray-600">Tan</p>
                </div>
                <div>
                  <div className="h-24 bg-secondary-cream rounded-lg mb-2"></div>
                  <p className="text-sm font-mono">#EBD6C3</p>
                  <p className="text-sm text-gray-600">Cream</p>
                </div>
                <div>
                  <div className="h-24 bg-secondary-brown rounded-lg mb-2"></div>
                  <p className="text-sm font-mono">#68300B</p>
                  <p className="text-sm text-gray-600">Brown</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card>
          <h2 className="text-2xl font-heading font-bold mb-6">Typography</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Headings (Bodoni Moda)</h3>
              <h1 className="text-5xl font-heading font-bold mb-2">Heading 1</h1>
              <h2 className="text-4xl font-heading font-bold mb-2">Heading 2</h2>
              <h3 className="text-3xl font-heading font-bold mb-2">Heading 3</h3>
              <h4 className="text-2xl font-heading font-bold mb-2">Heading 4</h4>
              <h5 className="text-xl font-heading font-bold mb-2">Heading 5</h5>
              <h6 className="text-lg font-heading font-bold">Heading 6</h6>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Body Text (Figtree)</h3>
              <p className="text-base mb-2">
                This is regular body text using the Figtree font family. It&apos;s designed for optimal readability.
              </p>
              <p className="text-sm mb-2">
                This is small text, perfect for captions and secondary information.
              </p>
              <p className="text-xs">
                This is extra small text, used for fine print and labels.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <Button onClick={() => window.location.href = '/'}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
