// config/theme.js
export const theme = {
  // Primary Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    DEFAULT: '#3b82f6',
  },
  
  // Secondary Colors
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    DEFAULT: '#8b5cf6',
  },
  
  // Gradient Configurations
  gradients: {
    primary: 'from-primary-600 to-secondary-600',
    secondary: 'from-secondary-500 to-primary-500',
    accent: 'from-cyan-500 to-blue-500',
    success: 'from-emerald-500 to-teal-500',
    warning: 'from-amber-500 to-orange-500',
    danger: 'from-rose-500 to-red-500',
  },
  
  // Background Gradients
  backgrounds: {
    hero: 'from-blue-600 via-blue-700 to-indigo-800',
    dashboard: 'from-sky-100 via-blue-50 to-indigo-100',
  },
  
  // Button Variants
  buttons: {
    primary: {
      gradient: 'from-primary-600 to-secondary-600',
      text: 'text-white',
      shadow: 'shadow-md',
    },
    success: {
      gradient: 'from-emerald-500 to-teal-500',
      text: 'text-white',
      shadow: 'shadow-md',
    },
  },
};

// Helper function to get button class
export const getButtonClass = (variant = 'primary', size = 'md') => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-4 text-xl',
  };
  
  const button = theme.buttons[variant];
  return `group relative inline-flex items-center justify-center ${sizes[size]} font-semibold ${button.text} rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl`;
};

export default theme;