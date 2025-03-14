import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tarefas';

class TarefaService {
  // Obter todas as tarefas
  getAll() {
    return axios.get(API_URL);
  }

  // Obter uma tarefa por ID
  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // Criar uma nova tarefa
  create(tarefa) {
    return axios.post(API_URL, tarefa);
  }

  // Atualizar uma tarefa existente
  update(id, tarefa) {
    return axios.put(`${API_URL}/${id}`, tarefa);
  }

  // Excluir uma tarefa
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new TarefaService();