<?php
// Configurar codificação UTF-8
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

// Definir cabeçalhos para CORS e JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Tratar requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configurar tratamento de erros
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log para debug
error_log("Requisição recebida: " . $_SERVER['REQUEST_URI']);
error_log("Método HTTP: " . $_SERVER['REQUEST_METHOD']);
error_log("Headers: " . json_encode(getallheaders()));

// Incluir arquivos necessários
require_once __DIR__ . '/../src/config/Database.php';
require_once __DIR__ . '/../src/models/Tarefa.php';
require_once __DIR__ . '/../src/controllers/TarefaController.php';

// Roteamento básico
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// Log para debug
error_log("URI processada: " . print_r($uri, true));

// Encontrar o índice de 'tarefas' na URI
$tarefasIndex = array_search('tarefas', $uri);

// Validar endpoint
if ($tarefasIndex === false) {
    header("HTTP/1.1 404 Not Found");
    echo json_encode(['error' => 'Endpoint não encontrado', 'uri' => $uri], JSON_UNESCAPED_UNICODE);
    error_log("Endpoint não encontrado: " . implode('/', $uri));
    exit();
}

// Criar instância do controller
$tarefaController = new TarefaController();

// Determinar ID, se existir (está após 'tarefas' na URI)
$id = isset($uri[$tarefasIndex + 1]) && is_numeric($uri[$tarefasIndex + 1]) ? (int)$uri[$tarefasIndex + 1] : null;

// Log para debug
error_log("ID da tarefa: " . ($id ?? 'null'));

// Roteamento por método HTTP
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            if ($id) {
                $tarefaController->obterTarefa($id);
            } else {
                $tarefaController->listarTarefas();
            }
            break;
        case 'POST':
            $tarefaController->criarTarefa();
            break;
        case 'PUT':
            if (!$id) {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(['error' => 'ID da tarefa não especificado'], JSON_UNESCAPED_UNICODE);
                exit();
            }
            $tarefaController->atualizarTarefa($id);
            break;
        case 'DELETE':
            if (!$id) {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(['error' => 'ID da tarefa não especificado'], JSON_UNESCAPED_UNICODE);
                exit();
            }
            $tarefaController->excluirTarefa($id);
            break;
        default:
            header("HTTP/1.1 405 Method Not Allowed");
            echo json_encode(['error' => 'Método não permitido'], JSON_UNESCAPED_UNICODE);
            break;
    }
} catch (Exception $e) {
    error_log("Erro na API: " . $e->getMessage());
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(['error' => 'Erro interno do servidor', 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}