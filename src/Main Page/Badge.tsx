import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
}

export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  // Switch case to determine CSS class
  const getBadgeClass = () => {
    switch(variant) {
      case 'HIGH':
        return 'badge badge-HIGH';
      case 'MEDIUM':
        return ' badge badge-MEDIUM';
      case 'LOW':
        return 'badge badge-LOW';
      case 'category':
        return 'badge badge-category';
      default:
        return 'badge badge-default';
    }
  };

  return (
    <span className={getBadgeClass()}>
      {children}
    </span>
  );
};