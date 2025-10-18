import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',        // Mobile: 12px, Desktop: 16px
    md: 'p-4 sm:p-6',        // Mobile: 16px, Desktop: 24px  
    lg: 'p-5 sm:p-8'         // Mobile: 20px, Desktop: 32px
  };

  // Build className manually without clsx - with responsive width control
  const cardClasses = [
    'bg-white rounded-lg shadow-md border border-gray-100 w-full',
    paddingClasses[padding],
    hover && 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;
