import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
      <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
    </div>
  );
}

export default LoadingSpinner; 