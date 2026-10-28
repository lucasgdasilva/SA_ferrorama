<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Você precisa estar autenticado.']);
    exit;
}

require_once __DIR__ . '/../config/conexao.php';

mysqli_set_charset($conexao, 'utf8mb4');

$metodo = $_SERVER['REQUEST_METHOD'];

try {
    if ($metodo === 'GET') {
        $sql = "SELECT id, nome, origem, destino, status
                FROM linhas
                ORDER BY id ASC";

        $resultado = mysqli_query($conexao, $sql);
        $linhas = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

        echo json_encode($linhas, JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($metodo === 'POST') {
        $dados = json_decode(file_get_contents('php://input'), true);

        if (!is_array($dados)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos.']);
            exit;
        }

        $nome = trim($dados['nome'] ?? '');
        $origem = trim($dados['origem'] ?? '');
        $destino = trim($dados['destino'] ?? '');
        $status = trim($dados['status'] ?? '');

        if ($nome === '' || $origem === '' || $destino === '') {
            http_response_code(422);
            echo json_encode(['erro' => 'Preencha todos os campos obrigatórios.']);
            exit;
        }

        $statusPermitidos = ['Ativa', 'Inativa', 'Em manutenção'];

        if (!in_array($status, $statusPermitidos, true)) {
            http_response_code(422);
            echo json_encode(['erro' => 'Status inválido.']);
            exit;
        }

        $sql = "INSERT INTO linhas (nome, origem, destino, status)
                VALUES (?, ?, ?, ?)";

        $stmt = mysqli_prepare($conexao, $sql);
        mysqli_stmt_bind_param($stmt, 'ssss', $nome, $origem, $destino, $status);
        mysqli_stmt_execute($stmt);

        http_response_code(201);
        echo json_encode([
            'mensagem' => 'Linha cadastrada com sucesso.',
            'id' => mysqli_insert_id($conexao)
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($metodo === 'PUT') {
        $dados = json_decode(file_get_contents('php://input'), true);

        if (!is_array($dados)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos.']);
            exit;
        }

        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);
        $nome = trim($dados['nome'] ?? '');
        $origem = trim($dados['origem'] ?? '');
        $destino = trim($dados['destino'] ?? '');
        $status = trim($dados['status'] ?? '');

        if (!$id || $nome === '' || $origem === '' || $destino === '') {
            http_response_code(422);
            echo json_encode(['erro' => 'Informe um ID válido e preencha todos os campos.']);
            exit;
        }

        $statusPermitidos = ['Ativa', 'Inativa', 'Em manutenção'];

        if (!in_array($status, $statusPermitidos, true)) {
            http_response_code(422);
            echo json_encode(['erro' => 'Status inválido.']);
            exit;
        }

        $sql = "UPDATE linhas
                SET nome = ?, origem = ?, destino = ?, status = ?
                WHERE id = ?";

        $stmt = mysqli_prepare($conexao, $sql);
        mysqli_stmt_bind_param($stmt, 'ssssi', $nome, $origem, $destino, $status, $id);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_affected_rows($stmt) === 0) {
            $verificar = mysqli_prepare($conexao, "SELECT id FROM linhas WHERE id = ?");
            mysqli_stmt_bind_param($verificar, 'i', $id);
            mysqli_stmt_execute($verificar);
            mysqli_stmt_store_result($verificar);

            if (mysqli_stmt_num_rows($verificar) === 0) {
                http_response_code(404);
                echo json_encode(['erro' => 'Linha não encontrada.']);
                exit;
            }
        }

        echo json_encode(['mensagem' => 'Linha atualizada com sucesso.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($metodo === 'DELETE') {
        $dados = json_decode(file_get_contents('php://input'), true);

        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id) {
            http_response_code(422);
            echo json_encode(['erro' => 'Informe um ID válido.']);
            exit;
        }

        $sql = "DELETE FROM linhas WHERE id = ?";

        $stmt = mysqli_prepare($conexao, $sql);
        mysqli_stmt_bind_param($stmt, 'i', $id);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_affected_rows($stmt) === 0) {
            http_response_code(404);
            echo json_encode(['erro' => 'Linha não encontrada.']);
            exit;
        }

        echo json_encode(['mensagem' => 'Linha excluída com sucesso.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    header('Allow: GET, POST, PUT, DELETE');
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido.']);

} catch (mysqli_sql_exception $e) {
    if ((int) $e->getCode() === 1062) {
        http_response_code(409);
        echo json_encode(['erro' => 'Já existe uma linha com esse nome.']);
    } elseif ((int) $e->getCode() === 1451) {
        http_response_code(409);
        echo json_encode([
            'erro' => 'Não é possível excluir esta linha porque existem registros vinculados a ela.'
        ], JSON_UNESCAPED_UNICODE);
    } else {
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode(['erro' => 'Ocorreu um erro ao acessar o banco de dados.']);
    }
}
