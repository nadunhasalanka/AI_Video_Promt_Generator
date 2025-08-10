
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-6 p-4 border border-red-500/50 bg-red-900/20 text-red-300 rounded-lg" role="alert">
      <p className="font-bold">Error</p>
      <p className="text-base">{message}</p>
    </div>
  );
};
