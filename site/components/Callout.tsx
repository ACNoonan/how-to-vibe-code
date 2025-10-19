import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'danger' | 'success';
  icon?: string;
}

const Callout: React.FC<CalloutProps> = ({ children, type = 'info', icon }) => {
  const baseClasses = 'p-4 rounded-md my-4';
  const typeClasses = {
    info: 'bg-blue-900/30 text-blue-200 border border-blue-700/50',
    warning: 'bg-yellow-900/30 text-yellow-200 border border-yellow-700/50',
    danger: 'bg-red-900/30 text-red-200 border border-red-700/50',
    success: 'bg-green-900/30 text-green-200 border border-green-700/50',
  };

  const defaultIcons = {
    info: '💡',
    warning: '⚠️',
    danger: '🔥',
    success: '✅',
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex items-start">
        <div className="text-xl mr-3">{icon || defaultIcons[type]}</div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Callout;

