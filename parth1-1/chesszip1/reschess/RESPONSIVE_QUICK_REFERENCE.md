# 📱 Responsive Quick Reference

Quick copy-paste patterns for maintaining responsive design.

---

## 🎯 Breakpoints

```tsx
// Tailwind breakpoints
sm: 640px   // Small devices
md: 768px   // Medium devices  
lg: 1024px  // Large devices
xl: 1280px  // Extra large
2xl: 1536px // 2X Extra large
```

---

## 📐 Common Patterns

### Grid Layouts

```tsx
// 1 column → 2 columns → 4 columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// 1 column → 3 columns
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// 2 columns → 3 columns → 4 columns
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

### Flex Layouts

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-4">

// Reverse on mobile
<div className="flex flex-col-reverse sm:flex-row">

// Center on mobile, space-between on desktop
<div className="flex flex-col sm:flex-row items-center sm:justify-between">
```

### Text Sizing

```tsx
// Headings
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
<h2 className="text-xl sm:text-2xl lg:text-3xl">
<h3 className="text-lg sm:text-xl lg:text-2xl">

// Body text
<p className="text-sm sm:text-base lg:text-lg">

// Small text
<span className="text-xs sm:text-sm">
```

### Spacing

```tsx
// Padding
<div className="p-3 sm:p-4 lg:p-6">
<div className="px-4 sm:px-6 lg:px-8">
<div className="py-3 sm:py-4 lg:py-6">

// Margin
<div className="m-3 sm:m-4 lg:m-6">
<div className="mb-4 sm:mb-6 lg:mb-8">

// Gap
<div className="gap-3 sm:gap-4 lg:gap-6">
```

### Width & Height

```tsx
// Responsive widths
<div className="w-full sm:w-auto">
<div className="w-full sm:w-1/2 lg:w-1/3">

// Max widths
<div className="max-w-sm sm:max-w-md lg:max-w-lg">

// Heights
<div className="h-auto sm:h-64 lg:h-96">
```

---

## 🎨 Component Patterns

### Button

```tsx
<Button 
  className="w-full sm:w-auto"
  size="md"
>
  Click Me
</Button>
```

### Card

```tsx
<Card className="p-4 sm:p-6">
  <h3 className="text-lg sm:text-xl mb-3 sm:mb-4">
    Title
  </h3>
  <p className="text-sm sm:text-base">
    Content
  </p>
</Card>
```

### Input

```tsx
<Input 
  className="w-full"
  placeholder="Enter text"
/>
```

### Badge

```tsx
<Badge variant="success" className="text-xs sm:text-sm">
  Active
</Badge>
```

---

## 🖼️ Image Patterns

```tsx
// Responsive image sizes
<img 
  src="/logo.svg"
  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
  alt="Logo"
/>

// Responsive icon sizes
<Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
```

---

## 📊 Chart Patterns

```tsx
// Always use ResponsiveContainer
<div className="w-full h-[200px] sm:h-[250px] lg:h-[300px]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip />
      <Line dataKey="value" stroke="#FC8A24" />
    </LineChart>
  </ResponsiveContainer>
</div>
```

---

## 🎯 Touch Target Rules

```tsx
// Minimum 44px height for buttons
<button className="min-h-[44px] min-w-[44px] p-2">

// Proper spacing between tap targets
<div className="space-y-3"> // At least 12px (3 * 4px)
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

## 📱 Mobile-Specific Patterns

### Hide on Mobile

```tsx
<div className="hidden sm:block">
  Desktop only content
</div>
```

### Show on Mobile Only

```tsx
<div className="block sm:hidden">
  Mobile only content
</div>
```

### Conditional Layout

```tsx
// Different layouts for mobile/desktop
<div className="flex flex-col lg:flex-row">
  <aside className="w-full lg:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

---

## 🔤 Text Truncation

```tsx
// Single line truncate
<p className="truncate">
  Very long text that will be cut off...
</p>

// Multi-line truncate (requires custom CSS)
<p className="line-clamp-2">
  Text that will be limited to 2 lines...
</p>
```

---

## 🎨 Visibility Patterns

```tsx
// Responsive visibility
<div className="hidden sm:block md:hidden lg:block">
  Visible on sm and lg+, hidden on xs and md
</div>

// Responsive flex
<div className="flex sm:hidden lg:flex">
  Flex on mobile and large screens
</div>
```

---

## 📦 Container Patterns

```tsx
// Responsive container
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  Content
</div>

// Max-width container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  Content
</div>
```

---

## 🎭 Overflow Handling

```tsx
// Prevent horizontal scroll
<div className="overflow-x-hidden">

// Scrollable on mobile, visible on desktop
<div className="overflow-x-auto sm:overflow-visible">

// Truncate with ellipsis
<div className="overflow-hidden text-ellipsis whitespace-nowrap">
```

---

## 🚀 Performance Tips

```tsx
// Use flex-shrink-0 for icons/images
<Icon className="w-5 h-5 flex-shrink-0" />

// Use min-w-0 for truncation in flex
<div className="flex">
  <div className="min-w-0 flex-1">
    <p className="truncate">Long text</p>
  </div>
</div>
```

---

## ✅ Checklist for New Components

When creating a new component:

- [ ] Use responsive text sizes
- [ ] Use responsive spacing
- [ ] Test on mobile first
- [ ] Ensure 44px+ tap targets
- [ ] Handle text overflow
- [ ] Use flex-shrink-0 for icons
- [ ] Test at all breakpoints
- [ ] No horizontal scroll
- [ ] Accessible on touch devices

---

## 🎯 Common Mistakes to Avoid

❌ **Don't:**
```tsx
// Fixed widths
<div className="w-[500px]">

// Desktop-only spacing
<div className="p-8">

// Small tap targets
<button className="p-1">

// No responsive text
<h1 className="text-6xl">
```

✅ **Do:**
```tsx
// Flexible widths
<div className="w-full sm:w-auto">

// Responsive spacing
<div className="p-3 sm:p-4 lg:p-8">

// Touch-friendly targets
<button className="p-2 min-h-[44px]">

// Responsive text
<h1 className="text-3xl sm:text-4xl lg:text-6xl">
```

---

## 📚 Resources

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Touch Target Sizes](https://web.dev/accessible-tap-targets/)
- [Mobile-First CSS](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)

---

**Keep this reference handy when building new features! 🚀**
