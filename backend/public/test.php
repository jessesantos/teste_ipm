<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'API está funcionando corretamente',
    'timestamp' => date('Y-m-d H:i:s')
]); 