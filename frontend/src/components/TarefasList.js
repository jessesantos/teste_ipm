import React from 'react';
import { format, isPast, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function TarefasList({ tarefas, onEdit, onDelete, onUpdateStatus }) {
  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  // Função para determinar a classe CSS do prazo
  const getPrazoClass = (dataPrazo, status) => {
    if (status === 'concluida') return "text-gray-500";
    
    const date = new Date(dataPrazo);
    
    if (isPast(date) && !isToday(date)) return "text-red-600 font-medium";
    if (isToday(date)) return "text-amber-600 font-medium";
    
    return "text-gray-700";
  };

  // Função para retornar o ícone baseado no status
  const getStatusIcon = (status) => {
    switch(status) {
      case 'concluida':
        return (
          <span className="p-1 bg-green-100 text-green-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
        );
      case 'em_andamento':
        return (
          <span className="p-1 bg-blue-100 text-blue-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </span>
        );
      default: // pendente
        return (
          <span className="p-1 bg-gray-100 text-gray-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          </span>
        );
    }
  };

  // Renderiza o nome do status formatado
  const getStatusName = (status) => {
    switch(status) {
      case 'concluida':
        return 'Concluída';
      case 'em_andamento':
        return 'Em andamento';
      default:
        return 'Pendente';
    }
  };

  return (
    <div className="space-y-4">
      {tarefas.map((tarefa) => (
        <div 
          key={tarefa.id}
          className={`bg-white border rounded-xl shadow-card p-5 transition-all duration-300 hover:shadow-card-hover ${
            tarefa.status === 'concluida' ? 'border-green-200 bg-green-50' : 
            tarefa.status === 'em_andamento' ? 'border-blue-200' : 'border-gray-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center">
                <button 
                  onClick={() => onUpdateStatus(tarefa.id, tarefa.status === 'concluida' ? 'pendente' : 'concluida')} 
                  className="mr-3 focus:outline-none"
                  title={tarefa.status === 'concluida' ? 'Marcar como pendente' : 'Marcar como concluída'}
                >
                  {getStatusIcon(tarefa.status)}
                </button>
                <h3 className={`text-lg font-semibold ${tarefa.status === 'concluida' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                  {tarefa.titulo}
                </h3>
              </div>
              
              {tarefa.descricao && (
                <p className={`mt-2 text-sm ${tarefa.status === 'concluida' ? 'text-gray-500' : 'text-gray-600'}`}>
                  {tarefa.descricao}
                </p>
              )}
              
              <div className="mt-3 flex flex-wrap items-center text-xs gap-x-4 gap-y-2">
                <div className={`flex items-center ${getPrazoClass(tarefa.data_prazo, tarefa.status)}`}>
                  <svg className="mr-1.5 h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Prazo: {formatDate(tarefa.data_prazo)}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <svg className="mr-1.5 h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Criada em: {formatDate(tarefa.data_criacao)}</span>
                </div>
                
                <div className="flex items-center text-gray-500">
                  <svg className="mr-1.5 h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 8a1 1 0 01-1 1H6a1 1 0 110-2h3V6a1 1 0 112 0v4z" clipRule="evenodd" />
                  </svg>
                  <span>Status: {getStatusName(tarefa.status)}</span>
                </div>
                
                {tarefa.status === 'concluida' && tarefa.data_conclusao && (
                  <div className="flex items-center text-green-600">
                    <svg className="mr-1.5 h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Concluída em: {formatDate(tarefa.data_conclusao)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 min-w-fit self-end sm:self-center">
              <button
                onClick={() => onUpdateStatus(tarefa.id, tarefa.status === 'em_andamento' ? 'pendente' : 'em_andamento')}
                className={`p-2 rounded-lg transition-colors ${
                  tarefa.status === 'em_andamento' 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={tarefa.status === 'em_andamento' ? 'Marcar como pendente' : 'Marcar como em andamento'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </button>
              
              <button
                onClick={() => onEdit(tarefa)}
                className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                title="Editar tarefa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              
              <button
                onClick={() => onDelete(tarefa.id)}
                className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                title="Excluir tarefa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TarefasList;