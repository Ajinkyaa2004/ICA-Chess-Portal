# Installation Guide - Indian Chess Academy Frontend

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For version control (optional)

### Check Your Versions

```bash
node --version   # Should be v18.0.0 or higher
npm --version    # Should be 9.0.0 or higher
```

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd CHESSacad
```

### Step 2: Install Dependencies

This will install all required packages including Next.js, React, TypeScript, Tailwind CSS, and more.

```bash
npm install
```

**Expected installation time**: 2-5 minutes depending on your internet connection.

### Step 3: Verify Installation

Check if all packages are installed correctly:

```bash
npm list --depth=0
```

You should see packages like:
- `next@^15.1.6`
- `react@^19.0.0`
- `typescript@^5.7.3`
- `tailwindcss@^3.4.17`
- `recharts@^2.15.0`
- `lucide-react@^0.468.0`

## 🏃 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

You should see output like:
```
▲ Next.js 15.1.6
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Production Build

To create an optimized production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

### Linting

To check for code quality issues:

```bash
npm run lint
```

## 🔧 Troubleshooting

### Issue: Port 3000 Already in Use

**Solution 1**: Kill the process using port 3000
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Solution 2**: Use a different port
```bash
npm run dev -- -p 3001
```

### Issue: Module Not Found Errors

**Solution**: Clear cache and reinstall
```bash
# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript Errors

**Solution**: Check TypeScript configuration
```bash
# Verify tsconfig.json exists
# Run type check
npx tsc --noEmit
```

### Issue: Tailwind Styles Not Loading

**Solution**: Ensure PostCSS is configured
```bash
# Check if postcss.config.mjs exists
# Restart dev server
npm run dev
```

### Issue: Build Fails

**Solution**: Clear Next.js cache
```bash
# Delete .next folder
rm -rf .next

# Rebuild
npm run build
```

## 📦 Package Details

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.1.6 | React framework |
| react | ^19.0.0 | UI library |
| react-dom | ^19.0.0 | React DOM renderer |
| typescript | ^5.7.3 | Type safety |

### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^3.4.17 | Utility-first CSS |
| postcss | ^8.4.49 | CSS processing |
| autoprefixer | Latest | CSS vendor prefixes |

### UI & Charts

| Package | Version | Purpose |
|---------|---------|---------|
| recharts | ^2.15.0 | Charts & analytics |
| lucide-react | ^0.468.0 | Icon library |
| clsx | ^2.1.1 | Conditional classes |
| tailwind-merge | ^2.7.0 | Merge Tailwind classes |

### Calendar (Ready for Integration)

| Package | Version | Purpose |
|---------|---------|---------|
| @fullcalendar/react | ^6.1.15 | Calendar component |
| @fullcalendar/daygrid | ^6.1.15 | Day grid view |
| @fullcalendar/timegrid | ^6.1.15 | Time grid view |
| @fullcalendar/interaction | ^6.1.15 | Drag & drop |

## 🌐 Browser Support

The application supports:
- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 📱 Device Testing

Test on various devices:
- **Mobile**: 375px - 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+

## 🔐 Environment Setup (Optional)

For future backend integration, create `.env.local`:

```bash
# Create environment file
touch .env.local
```

Add variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Indian Chess Academy
```

**Note**: `.env.local` is already in `.gitignore`

## 📊 Performance Optimization

### Enable Production Mode

```bash
NODE_ENV=production npm start
```

### Analyze Bundle Size

```bash
npm run build
```

Check the output for bundle sizes.

## 🧪 Testing Setup (Future)

To add testing capabilities:

```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Install Playwright for E2E
npm install --save-dev @playwright/test
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

- **Netlify**: Connect GitHub repo
- **AWS Amplify**: Use AWS console
- **Docker**: Create Dockerfile

## 📝 Post-Installation Checklist

- [ ] Dependencies installed successfully
- [ ] Dev server runs without errors
- [ ] Landing page loads at http://localhost:3000
- [ ] All pages are accessible
- [ ] No console errors
- [ ] Responsive design works
- [ ] Components render correctly

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**
   - README.md
   - QUICKSTART.md
   - IMPLEMENTATION.md

2. **Common Issues**
   - Clear browser cache
   - Restart dev server
   - Check Node.js version
   - Verify all files are present

3. **Contact Support**
   - Email: dev@indianchessacademy.com
   - Check project issues

## 🎉 Success!

If you see the landing page at http://localhost:3000, you're all set!

### Next Steps:

1. Explore the application
2. Check `/showcase` for component examples
3. Review the code structure
4. Start customizing

---

**Installation Time**: ~5-10 minutes
**Difficulty**: Beginner-friendly
**Support**: Full documentation available
