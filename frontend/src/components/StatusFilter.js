import React from 'react';

function StatusFilter({ filtroAtual, onChangeFilter }) {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
      <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
      <div className="flex space-x-1">
        <button
          onClick={() => onChangeFilter('todas')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filtroAtual === 'todas'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => onChangeFilter('pendente')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filtroAtual === 'pendente'
              ? 'bg-gray-700 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pendentes
        </button>
        <button
          onClick={() => onChangeFilter('em_andamento')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filtroAtual === 'em_andamento'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Em andamento
        </button>
        <button
          onClick={() => onChangeFilter('concluida')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            filtroAtual === 'concluida'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          Concluídas
        </button>
      </div>
    </div>
  );
}

export default StatusFilter; 