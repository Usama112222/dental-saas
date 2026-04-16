// src/styles/theme.js

export const colors = {
  primary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },
  secondary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

export const gradients = {
  navbar: 'from-sky-300 to-blue-600',
  button: 'from-sky-500 to-blue-600',
  buttonHover: 'from-sky-600 to-blue-700',
  heading: 'from-sky-600 via-blue-600 to-indigo-600',
  card: 'from-white to-sky-50',
  hero: 'from-sky-50 via-blue-50 to-white',
};

export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    heading: 'Poppins, Inter, system-ui, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const spacing = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-16 md:py-20 lg:py-24',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

export const borderRadius = {
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// CSS Classes as strings for easy reuse
export const classes = {
  // Gradients
  navbarBg: 'bg-gradient-to-r from-sky-300 to-blue-600',
  buttonBg: 'bg-gradient-to-r from-sky-500 to-blue-600',
  buttonBgHover: 'hover:from-sky-600 hover:to-blue-700',
  headingGradient: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent',
  
  // Buttons
  buttonPrimary: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg',
  buttonSecondary: 'border-2 border-sky-500 text-sky-600 font-semibold py-3 px-6 rounded-xl hover:bg-sky-50 transition-all duration-300',
  buttonOutline: 'border-2 border-white text-white font-semibold py-2 px-5 rounded-lg hover:bg-white/10 transition-all duration-200',
  buttonSolid: 'bg-white text-sky-600 font-semibold py-2 px-5 rounded-lg hover:bg-gray-100 transition-all duration-200',
  
  // Cards
  card: 'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100',
  cardStats: 'bg-white shadow-lg rounded-xl p-4 text-center border border-gray-100 hover:shadow-xl transition-all duration-300',
  
  // Text
  heading1: 'text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight',
  heading2: 'text-3xl md:text-4xl font-bold text-gray-900',
  heading3: 'text-2xl md:text-3xl font-bold text-gray-900',
  bodyText: 'text-lg text-gray-600 leading-relaxed',
  
  // Containers
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-16 md:py-20 lg:py-24',
  
  // Flex layouts
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexColumn: 'flex flex-col',
  
  // Grid
  grid2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
  grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  grid4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  
  // Badges
  badge: 'inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-2 rounded-full shadow-md text-white text-sm font-medium',
  
  // Stats
  statValue: 'font-bold text-2xl text-gray-900',
  statLabel: 'text-sm text-gray-500',
};

export default {
  colors,
  gradients,
  typography,
  spacing,
  shadows,
  borderRadius,
  classes,
};