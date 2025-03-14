import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

function TarefaForm({ tarefa, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    status: 'pendente',
    data_prazo: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (tarefa) {
      setFormData({
        id: tarefa.id,
        titulo: tarefa.titulo,
        descricao: tarefa.descricao || '',
        status: tarefa.status || 'pendente',
        data_prazo: tarefa.data_prazo ? format(new Date(tarefa.data_prazo), 'yyyy-MM-dd') : ''
      });
    }
  }, [tarefa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.titulo.trim()) {
      toast.error('O título da tarefa é obrigatório');
      return;
    }
    
    if (!formData.data_prazo) {
      toast.error('A data de prazo é obrigatória');
      return;
    }
    
    onSave(formData);
  };

  // Se o modal não estiver aberto, não renderiza o componente
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4">
          <h3 className="text-lg font-medium text-white">
            {tarefa ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Digite o título da tarefa"
                required
              />
            </div>
            
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Descreva os detalhes da tarefa"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="pendente">Pendente</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluida">Concluída</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="data_prazo" className="block text-sm font-medium text-gray-700 mb-1">
                Data prazo *
              </label>
              <input
                type="date"
                id="data_prazo"
                name="data_prazo"
                value={formData.data_prazo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {tarefa ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TarefaForm;