<?php
/**
 * Classe TarefaController
 * 
 * Responsável por controlar as operações relacionadas às tarefas
 * Implementa o padrão MVC, tratando as requisições e retornando as respostas
 */
class TarefaController {
    private $tarefa;
    private $db;

    /**
     * Construtor - Inicializa a conexão com o banco e o modelo
     */
    public function __construct() {
        $database = new Database();
        $db = $database->getConnection();
        $this->tarefa = new Tarefa($db);
        $this->db = $db;
    }

    /**
     * Listar todas as tarefas
     * 
     * @return void Retorna JSON com todas as tarefas
     */
    public function listarTarefas() {
        try {
            $stmt = $this->tarefa->listar();
            $tarefas = [];
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $tarefas[] = [
                    'id' => $row['id'],
                    'titulo' => $row['titulo'],
                    'descricao' => $row['descricao'],
                    'status' => $row['status'],
                    'data_criacao' => $row['data_criacao'],
                    'data_prazo' => $row['data_prazo'],
                    'data_conclusao' => $row['data_conclusao']
                ];
            }
            
            echo json_encode(['tarefas' => $tarefas, 'total' => count($tarefas)], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['message' => 'Erro ao listar tarefas', 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Obter uma tarefa específica por ID
     * 
     * @param int $id ID da tarefa
     * @return void Retorna JSON com os dados da tarefa
     */
    public function obterTarefa($id) {
        try {
            if (!$this->tarefa->obterPorId($id)) {
                header("HTTP/1.1 404 Not Found");
                echo json_encode(['message' => 'Tarefa não encontrada'], JSON_UNESCAPED_UNICODE);
                return;
            }
            
            $tarefa_arr = [
                'id' => $this->tarefa->id,
                'titulo' => $this->tarefa->titulo,
                'descricao' => $this->tarefa->descricao,
                'status' => $this->tarefa->status,
                'data_criacao' => $this->tarefa->data_criacao,
                'data_prazo' => $this->tarefa->data_prazo,
                'data_conclusao' => $this->tarefa->data_conclusao
            ];
            
            echo json_encode($tarefa_arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['message' => 'Erro ao obter tarefa', 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Criar uma nova tarefa
     * 
     * @return void Retorna JSON com a confirmação da criação
     */
    public function criarTarefa() {
        try {
            // Receber dados do corpo da requisição
            $data = json_decode(file_get_contents("php://input"));
            
            // Validar dados obrigatórios
            if (empty($data->titulo)) {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(['message' => 'O título da tarefa é obrigatório'], JSON_UNESCAPED_UNICODE);
                return;
            }
            
            // Preencher objeto tarefa
            $this->tarefa->titulo = $data->titulo;
            $this->tarefa->descricao = $data->descricao ?? '';
            $this->tarefa->status = $data->status ?? 'pendente';
            $this->tarefa->data_prazo = $data->data_prazo ?? date('Y-m-d H:i:s', strtotime('+1 week'));
            
            // Criar tarefa
            if ($this->tarefa->criar()) {
                header("HTTP/1.1 201 Created");
                echo json_encode([
                    'message' => 'Tarefa criada com sucesso',
                    'id' => $this->tarefa->id,
                    'tarefa' => [
                        'id' => $this->tarefa->id,
                        'titulo' => $this->tarefa->titulo,
                        'descricao' => $this->tarefa->descricao,
                        'status' => $this->tarefa->status,
                        'data_prazo' => $this->tarefa->data_prazo
                    ]
                ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            } else {
                header("HTTP/1.1 503 Service Unavailable");
                echo json_encode(['message' => 'Não foi possível criar a tarefa'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['message' => 'Erro ao criar tarefa', 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Atualizar uma tarefa existente
     * 
     * @param int $id ID da tarefa
     * @return void Retorna JSON com a confirmação da atualização
     */
    public function atualizarTarefa($id) {
        try {
            // Verificar se a tarefa existe
            if (!$this->tarefa->obterPorId($id)) {
                header("HTTP/1.1 404 Not Found");
                echo json_encode(['message' => 'Tarefa não encontrada'], JSON_UNESCAPED_UNICODE);
                return;
            }
            
            // Receber dados do corpo da requisição
            $data = json_decode(file_get_contents("php://input"));
            
            // Validar dados obrigatórios
            if (empty($data->titulo)) {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(['message' => 'O título da tarefa é obrigatório'], JSON_UNESCAPED_UNICODE);
                return;
            }
            
            // Preencher objeto tarefa
            $this->tarefa->id = $id;
            $this->tarefa->titulo = $data->titulo;
            $this->tarefa->descricao = $data->descricao ?? $this->tarefa->descricao;
            $this->tarefa->status = $data->status ?? $this->tarefa->status;
            $this->tarefa->data_prazo = $data->data_prazo ?? $this->tarefa->data_prazo;
            
            // Atualizar tarefa
            if ($this->tarefa->atualizar()) {
                echo json_encode([
                    'message' => 'Tarefa atualizada com sucesso',
                    'tarefa' => [
                        'id' => $this->tarefa->id,
                        'titulo' => $this->tarefa->titulo,
                        'descricao' => $this->tarefa->descricao,
                        'status' => $this->tarefa->status,
                        'data_prazo' => $this->tarefa->data_prazo,
                        'data_conclusao' => $this->tarefa->data_conclusao
                    ]
                ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            } else {
                header("HTTP/1.1 503 Service Unavailable");
                echo json_encode(['message' => 'Não foi possível atualizar a tarefa'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['message' => 'Erro ao atualizar tarefa', 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Excluir uma tarefa
     * 
     * @param int $id ID da tarefa
     * @return void Retorna JSON com a confirmação da exclusão
     */
    public function excluirTarefa($id) {
        try {
            // Verificar se a tarefa existe
            if (!$this->tarefa->obterPorId($id)) {
                header("HTTP/1.1 404 Not Found");
                echo json_encode(['message' => 'Tarefa não encontrada'], JSON_UNESCAPED_UNICODE);
                return;
            }
            
            $this->tarefa->id = $id;
            
            // Excluir tarefa
            if ($this->tarefa->excluir()) {
                echo json_encode(['message' => 'Tarefa excluída com sucesso'], JSON_UNESCAPED_UNICODE);
            } else {
                header("HTTP/1.1 503 Service Unavailable");
                echo json_encode(['message' => 'Não foi possível excluir a tarefa'], JSON_UNESCAPED_UNICODE);
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['message' => 'Erro ao excluir tarefa', 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }
}