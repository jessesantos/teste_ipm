# Agenda de Tarefas

Um sistema completo de gerenciamento de tarefas desenvolvido com PHP, MySQL e React JS.

## Visão Geral

Este projeto implementa uma aplicação web para gerenciamento de tarefas pessoais, permitindo aos usuários criar, visualizar, editar, marcar como concluídas e excluir tarefas. A aplicação foi desenvolvida seguindo o padrão MVC (Model-View-Controller) e utiliza Programação Orientada a Objetos.

## Funcionalidades

- Listagem de todas as tarefas
- Filtragem de tarefas por status (Todas, Pendentes, Em andamento, Concluídas)
- Adição de novas tarefas
- Edição de tarefas existentes
- Marcação de tarefas como concluídas ou em andamento
- Exclusão de tarefas
- Interface responsiva e amigável

## Tecnologias Utilizadas

### Backend
- PHP 8.0 (sem frameworks)
- MySQL 8.0
- Padrão MVC
- Programação Orientada a Objetos
- RESTful API

### Frontend
- React JS
- Tailwind CSS
- Axios para requisições HTTP
- date-fns para manipulação de datas

### Infraestrutura
- Docker e Docker Compose para containerização
- Apache como servidor web

## Estrutura do Projeto

```
agenda-tarefas/
├── backend/
│   ├── database/
│   │   └── init.sql
│   ├── public/
│   │   └── index.php
│   ├── src/
│   │   ├── config/
│   │   │   └── Database.php
│   │   ├── controllers/
│   │   │   └── TarefaController.php
│   │   └── models/
│   │       └── Tarefa.php
│   └── Dockerfile
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.js
│   │   │   ├── Header.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── StatusFilter.js
│   │   │   ├── TarefaForm.js
│   │   │   └── TarefasList.js
│   │   ├── services/
│   │   │   └── TarefaService.js
│   │   └── App.js
│   ├── Dockerfile
│   ├── package.json
│   └── tailwind.config.js
└── docker-compose.yml
```

## Requisitos do Sistema

- Docker e Docker Compose
- Navegador web moderno

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/agenda-tarefas.git
   cd agenda-tarefas
   ```

2. Inicie os containers com Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Acesse a aplicação:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api/tarefas
   - phpMyAdmin: http://localhost:8080 (usuário: agenda_user, senha: Dlf_d88Ff0asCC)

## Estrutura do Banco de Dados

A aplicação utiliza uma tabela principal `tarefas` com a seguinte estrutura:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | Identificador único da tarefa (chave primária) |
| titulo | VARCHAR(255) | Título da tarefa |
| descricao | TEXT | Descrição detalhada da tarefa |
| status | ENUM | Status da tarefa (pendente, em_andamento, concluida) |
| data_criacao | DATETIME | Data e hora de criação da tarefa |
| data_prazo | DATETIME | Data e hora limite para conclusão |
| data_conclusao | DATETIME | Data e hora em que a tarefa foi concluída |

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/tarefas | Listar todas as tarefas |
| GET | /api/tarefas/{id} | Obter uma tarefa específica |
| POST | /api/tarefas | Criar uma nova tarefa |
| PUT | /api/tarefas/{id} | Atualizar uma tarefa existente |
| DELETE | /api/tarefas/{id} | Excluir uma tarefa |

## Características Técnicas

### Backend

- Implementação do padrão MVC para separação de responsabilidades
- Utilização de POO com classes para modelos e controladores
- Conexão com banco de dados utilizando PDO para segurança
- Tratamento de erros e exceções
- Validação de dados de entrada
- Respostas em formato JSON

### Frontend

- Componentização com React JS
- Estilização moderna com Tailwind CSS
- Estado gerenciado com React Hooks
- Comunicação assíncrona com a API
- Feedback visual para o usuário (loading, mensagens de sucesso/erro)
- Interface responsiva para diferentes dispositivos

## Segurança

- Validação de dados no backend e frontend
- Proteção contra SQL Injection usando PDO e prepared statements
- Sanitização de dados de entrada
- Tratamento adequado de erros

## Autor

Desenvolvido como parte de um projeto de avaliação técnica. 
