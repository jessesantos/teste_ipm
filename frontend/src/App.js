import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import TarefasList from './components/TarefasList';
import TarefaForm from './components/TarefaForm';
import EmptyState from './components/EmptyState';
import TarefaService from './services/TarefaService';
import StatusFilter from './components/StatusFilter';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTarefa, setCurrentTarefa] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [filteredTarefas, setFilteredTarefas] = useState([]);
  
  // Carregar tarefas
  useEffect(() => {
    fetchTarefas();
  }, []);

  // Filtrar tarefas pelo status
  useEffect(() => {
    if (filtroStatus === 'todas') {
      setFilteredTarefas(tarefas);
    } else {
      setFilteredTarefas(tarefas.filter(tarefa => tarefa.status === filtroStatus));
    }
  }, [tarefas, filtroStatus]);

  const fetchTarefas = async () => {
    setIsLoading(true);
    try {
      const response = await TarefaService.getAll();
      setTarefas(response.data.tarefas);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenModal = (tarefa = null) => {
    setCurrentTarefa(tarefa);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentTarefa(null);
    setIsModalOpen(false);
  };

  const handleSaveTarefa = async (tarefa) => {
    setIsLoading(true);
    try {
      if (tarefa.id) {
        // Atualizar tarefa existente
        await TarefaService.update(tarefa.id, tarefa);
      } else {
        // Criar nova tarefa
        await TarefaService.create(tarefa);
      }
      await fetchTarefas();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTarefa = async (id) => {
    setIsLoading(true);
    try {
      await TarefaService.delete(id);
      await fetchTarefas();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    setIsLoading(true);
    try {
      const tarefa = tarefas.find(t => t.id === id);
      const updatedTarefa = { ...tarefa, status };
      await TarefaService.update(id, updatedTarefa);
      await fetchTarefas();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <Header onAddTarefa={() => handleOpenModal()} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Minhas Tarefas</h2>
            <StatusFilter 
              filtroAtual={filtroStatus} 
              onChangeFilter={setFiltroStatus} 
            />
          </div>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredTarefas.length > 0 ? (
            <TarefasList 
              tarefas={filteredTarefas} 
              onEdit={handleOpenModal}
              onDelete={handleDeleteTarefa}
              onUpdateStatus={handleUpdateStatus}
            />
          ) : (
            <EmptyState onAddTarefa={() => handleOpenModal()} />
          )}
        </div>
      </main>
      
      {isModalOpen && (
        <TarefaForm
          tarefa={currentTarefa}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTarefa}
        />
      )}
    </div>
  );
}

export default App;