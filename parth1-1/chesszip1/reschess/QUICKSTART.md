# Quick Start Guide - Indian Chess Academy Frontend

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons

### Step 2: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### Step 3: Explore the Application

#### 🏠 Landing Page
- Navigate to `/` to see the homepage
- Click "Book Free Demo" to test the booking flow

#### 🔐 Authentication
- Go to `/auth/login` to see the login page
- Try `/auth/register` for registration
- Test `/auth/forgot-password` for password recovery

#### 📅 Demo Booking
- Visit `/booking/demo` for the 3-step booking process
- Complete the form to see the success page

#### 🤖 Matching Engine
- Check `/matching` to see the coach matching interface
- Test the coach selection and matching flow

#### 💰 Pricing
- View `/pricing` for the subscription plans
- Toggle between monthly and annual billing

#### 📊 Dashboards

**Parent Dashboard:**
```
/dashboard/parent          - Main dashboard
/dashboard/parent/progress - Student progress tracking
/dashboard/parent/billing  - Payment & billing
/dashboard/parent/messages - Messaging system
```

**Coach Dashboard:**
```
/dashboard/coach           - Coach main dashboard
```

## 🎨 Key Features to Test

### 1. Responsive Design
- Resize your browser to see mobile/tablet/desktop layouts
- All pages are fully responsive

### 2. Interactive Components
- Click buttons to see loading states
- Fill forms to see validation
- Hover over cards for effects

### 3. Charts & Analytics
- View rating progress charts
- Check skills radar charts
- See earnings bar charts

### 4. Mock Data
All dashboards use mock data. You'll see:
- Sample students and coaches
- Fake payment history
- Mock messages and notifications

## 🛠️ Development Tips

### Hot Reload
The dev server supports hot reload. Edit any file and see changes instantly.

### Component Structure
```
components/
├── ui/              - Reusable UI components
└── dashboard/       - Dashboard-specific components
```

### Adding New Pages
1. Create a new folder in `app/`
2. Add a `page.tsx` file
3. The route is automatically created

Example:
```
app/new-page/page.tsx → /new-page
```

### Using Components

```tsx
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function MyPage() {
  return (
    <Card>
      <Button variant="primary">Click Me</Button>
    </Card>
  );
}
```

### Styling with Tailwind

```tsx
<div className="bg-primary-blue text-white p-6 rounded-lg">
  Content
</div>
```

Available custom colors:
- `primary-blue` - #003366
- `primary-orange` - #FC8A24
- `primary-offwhite` - #FFFEF3
- `primary-olive` - #6B8E23

## 📝 Common Tasks

### Add a New Dashboard Widget

1. Create component in `components/dashboard/`
2. Import in dashboard page
3. Add to grid layout

### Create a New Form

```tsx
'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function MyForm() {
  const [formData, setFormData] = useState({ name: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Add a Chart

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 150 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#FC8A24" />
  </LineChart>
</ResponsiveContainer>
```

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors
```bash
# Check for type errors
npm run build
```

## 📚 Next Steps

1. **Explore the Code**: Check out the component files to understand the structure
2. **Customize**: Modify colors, fonts, and layouts in `tailwind.config.ts`
3. **Add Features**: Follow patterns in existing components
4. **Backend Integration**: See `IMPLEMENTATION.md` for API integration guide

## 🎯 Testing Different Roles

The app supports 4 user roles:
- **Parent** - `/dashboard/parent`
- **Student** - `/dashboard/student` (to be implemented)
- **Coach** - `/dashboard/coach`
- **Admin** - `/dashboard/admin` (to be implemented)

## 💡 Pro Tips

1. Use the browser's React DevTools to inspect components
2. Check the Network tab to see mock API calls
3. Use Tailwind CSS IntelliSense extension in VS Code
4. Enable TypeScript strict mode for better type safety

## 🆘 Need Help?

- Check `README.md` for project overview
- See `IMPLEMENTATION.md` for detailed implementation guide
- Review component files for usage examples
- Check TypeScript types in `types/index.ts`

---

Happy coding! 🎉
