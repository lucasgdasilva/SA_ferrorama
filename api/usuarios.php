<?php

session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Você precisa estar autenticado.']);
    exit;
}

if (($_SESSION['usuario_cargo'] ?? '') !== 'administrador') {
    http_response_code(403);
    echo json_encode(['erro' => 'Apenas administradores podem gerenciar usuários.']);
    exit;
}

require_once '../config/conexao.php';
$conexao->set_charset('utf8mb4');

try {
    $metodo = $_SERVER['REQUEST_METHOD'];

    if ($metodo === 'GET' && isset($_GET['verificar'])) {
        echo json_encode(['acesso' => true]);
        exit;
    }

    if ($metodo === 'GET') {
        $sql = "SELECT id, nome, email, cargo, criado_em FROM usuarios ORDER BY nome ASC";
        $resultado = $conexao->query($sql);
        $usuarios = $resultado->fetch_all(MYSQLI_ASSOC);

        echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($metodo === 'PUT') {
        $dados = json_decode(file_get_contents('php://input'), true);
        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);
        $cargo = strtolower(trim($dados['cargo'] ?? ''));

        if (!$id || !in_array($cargo, ['operador', 'administrador'], true)) {
            http_response_code(400);
            echo json_encode(['erro' => 'Dados inválidos.']);
            exit;
        }

        if ($id === (int) $_SESSION['usuario_id'] && $cargo !== 'administrador') {
            http_response_code(400);
            echo json_encode(['erro' => 'Você não pode remover sua própria permissão de administrador.']);
            exit;
        }

        $stmt = $conexao->prepare('SELECT cargo FROM usuarios WHERE id = ? LIMIT 1');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $usuario = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        if (!$usuario) {
            http_response_code(404);
            echo json_encode(['erro' => 'Usuário não encontrado.']);
            exit;
        }

        if ($usuario['cargo'] === 'administrador' && $cargo !== 'administrador') {
            $resultado = $conexao->query("SELECT COUNT(*) AS total FROM usuarios WHERE cargo = 'administrador'");
            $totalAdministradores = (int) $resultado->fetch_assoc()['total'];

            if ($totalAdministradores <= 1) {
                http_response_code(400);
                echo json_encode(['erro' => 'O sistema precisa ter pelo menos um administrador.']);
                exit;
            }
        }

        $stmt = $conexao->prepare('UPDATE usuarios SET cargo = ? WHERE id = ?');
        $stmt->bind_param('si', $cargo, $id);
        $stmt->execute();
        $stmt->close();

        echo json_encode(['mensagem' => 'Permissão atualizada com sucesso.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido.']);
} catch (mysqli_sql_exception $erro) {
    error_log($erro->getMessage());
    http_response_code(500);
    echo json_encode(['erro' => 'Não foi possível realizar a operação.']);
}
