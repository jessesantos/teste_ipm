<?php
/**
 * Classe Tarefa
 * 
 * Representa o modelo de dados de uma tarefa na agenda
 */
class Tarefa {
    // Conexão e tabela
    private $conn;
    private $table_name = "tarefas";

    // Propriedades
    public $id;
    public $titulo;
    public $descricao;
    public $status;
    public $data_criacao;
    public $data_prazo;
    public $data_conclusao;

    /**
     * Construtor
     * 
     * @param PDO $db Conexão com o banco de dados
     */
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Listar todas as tarefas
     * 
     * @return PDOStatement
     */
    public function listar() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY data_prazo ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    /**
     * Criar nova tarefa
     * 
     * @return boolean
     */
    public function criar() {
        $query = "INSERT INTO " . $this->table_name . "
                (titulo, descricao, status, data_prazo)
                VALUES (:titulo, :descricao, :status, :data_prazo)";

        $stmt = $this->conn->prepare($query);

        // Limpar e vincular dados
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->status = htmlspecialchars(strip_tags($this->status));

        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':data_prazo', $this->data_prazo);

        // Executar
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    /**
     * Obter uma tarefa por ID
     * 
     * @param int $id ID da tarefa
     * @return boolean
     */
    public function obterPorId($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$row) {
            return false;
        }

        $this->id = $row['id'];
        $this->titulo = $row['titulo'];
        $this->descricao = $row['descricao'];
        $this->status = $row['status'];
        $this->data_criacao = $row['data_criacao'];
        $this->data_prazo = $row['data_prazo'];
        $this->data_conclusao = $row['data_conclusao'];
        
        return true;
    }

    /**
     * Atualizar tarefa
     * 
     * @return boolean
     */
    public function atualizar() {
        $query = "UPDATE " . $this->table_name . "
                SET titulo = :titulo,
                    descricao = :descricao,
                    status = :status,
                    data_prazo = :data_prazo";
        
        // Adicionar data de conclusão se status for 'concluida'
        if ($this->status === 'concluida') {
            $query .= ", data_conclusao = NOW() ";
        } else {
            $query .= ", data_conclusao = NULL ";
        }
        
        $query .= "WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Limpar e vincular dados
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->descricao = htmlspecialchars(strip_tags($this->descricao));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':titulo', $this->titulo);
        $stmt->bindParam(':descricao', $this->descricao);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':data_prazo', $this->data_prazo);
        $stmt->bindParam(':id', $this->id);

        // Executar
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    /**
     * Excluir tarefa
     * 
     * @return boolean
     */
    public function excluir() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}