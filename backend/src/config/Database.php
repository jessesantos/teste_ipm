<?php
/**
 * Classe Database
 * 
 * Responsável pela conexão com o banco de dados MySQL
 */
class Database {
    private $host = 'db';
    private $db_name = 'agenda_db';
    private $username = 'agenda_user';
    private $password = 'Dlf_d88Ff0asCC';
    private $conn = null;

    /**
     * Obtém uma conexão com o banco de dados
     * 
     * @return PDO Objeto de conexão com o banco de dados
     */
    public function getConnection() {
        try {
            if ($this->conn === null) {
                $this->conn = new PDO(
                    "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                    $this->username,
                    $this->password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
                    ]
                );
            }
            return $this->conn;
        } catch (PDOException $exception) {
            echo "Erro de conexão: " . $exception->getMessage();
            return null;
        }
    }
}