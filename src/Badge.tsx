import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'HIGH' | 'MEDIUM' | 'LOW' | 'default' | 'category';
}

export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
};