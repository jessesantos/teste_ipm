CREATE DATABASE IF NOT EXISTS agenda_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE agenda_db;

CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status ENUM('pendente', 'em_andamento', 'concluida') DEFAULT 'pendente',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_prazo DATETIME,
    data_conclusao DATETIME NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir algumas tarefas de exemplo
INSERT INTO tarefas (titulo, descricao, status, data_criacao, data_prazo) VALUES
('Desenvolver API', 'Criar endpoints para CRUD de tarefas', 'pendente', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),
('Implementar Frontend', 'Desenvolver interface com React', 'pendente', NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY)),
('Escrever documentação', 'Preparar readme e documentar código', 'pendente', NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY));