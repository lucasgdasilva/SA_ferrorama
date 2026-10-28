
<?php
session_start();

header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Sessão expirada. Faça login novamente.']);
    exit;
}

require_once __DIR__ . '/../config/conexao.php';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function responder($dados, $status = 200) {
    http_response_code($status);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function obterDados() {
    $dados = json_decode(file_get_contents('php://input'), true);

    if (!is_array($dados)) {
        responder(['erro' => 'Dados inválidos.'], 400);
    }

    return $dados;
}

function validarAlerta($dados) {
    foreach (['codigo', 'descricao', 'linha', 'status', 'gravidade'] as $campo) {
        if (!isset($dados[$campo]) || trim((string) $dados[$campo]) === '') {
            responder(['erro' => 'Preencha todos os campos obrigatórios.'], 422);
        }
    }

    if (mb_strlen(trim($dados['descricao'])) > 255) {
        responder(['erro' => 'A descrição pode ter no máximo 255 caracteres.'], 422);
    }

    if (!in_array($dados['status'], ['Ativo', 'Resolvido'], true)) {
        responder(['erro' => 'Status do alerta inválido.'], 422);
    }

    if (!in_array($dados['gravidade'], ['Baixa', 'Média', 'Alta'], true)) {
        responder(['erro' => 'Gravidade do alerta inválida.'], 422);
    }
}

function obterIdLinha($conexao, $nomeLinha) {
    $consulta = $conexao->prepare(
        'SELECT id FROM linhas WHERE nome = ?'
    );
    $consulta->bind_param('s', $nomeLinha);
    $consulta->execute();

    $linha = $consulta->get_result()->fetch_assoc();
    $consulta->close();

    if (!$linha) {
        responder(['erro' => 'Selecione uma linha válida.'], 422);
    }

    return (int) $linha['id'];
}

try {
    $metodo = $_SERVER['REQUEST_METHOD'];

    if ($metodo === 'GET') {
        $consulta = $conexao->query(
            'SELECT a.id, a.codigo, a.descricao, a.status,
                    a.gravidade, a.linha_id, l.nome AS linha
             FROM alertas a
             INNER JOIN linhas l ON l.id = a.linha_id
             ORDER BY a.id DESC'
        );

        responder($consulta->fetch_all(MYSQLI_ASSOC));
    }

    if ($metodo === 'POST') {
        $dados = obterDados();
        validarAlerta($dados);

        $codigo = trim($dados['codigo']);
        $descricao = trim($dados['descricao']);
        $linhaId = obterIdLinha($conexao, trim($dados['linha']));
        $status = $dados['status'];
        $gravidade = $dados['gravidade'];

        $consulta = $conexao->prepare(
            'INSERT INTO alertas (codigo, descricao, linha_id, status, gravidade)
             VALUES (?, ?, ?, ?, ?)'
        );
        $consulta->bind_param(
            'ssiss',
            $codigo,
            $descricao,
            $linhaId,
            $status,
            $gravidade
        );
        $consulta->execute();

        $id = $conexao->insert_id;
        $consulta->close();

        responder([
            'mensagem' => 'Alerta cadastrado com sucesso.',
            'id' => $id
        ], 201);
    }

    if ($metodo === 'PUT') {
        $dados = obterDados();
        validarAlerta($dados);

        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id || $id < 1) {
            responder(['erro' => 'ID do alerta inválido.'], 422);
        }

        $codigo = trim($dados['codigo']);
        $descricao = trim($dados['descricao']);
        $linhaId = obterIdLinha($conexao, trim($dados['linha']));
        $status = $dados['status'];
        $gravidade = $dados['gravidade'];

        $consulta = $conexao->prepare(
            'UPDATE alertas
             SET codigo = ?, descricao = ?, linha_id = ?,
                 status = ?, gravidade = ?
             WHERE id = ?'
        );
        $consulta->bind_param(
            'ssissi',
            $codigo,
            $descricao,
            $linhaId,
            $status,
            $gravidade,
            $id
        );
        $consulta->execute();
        $consulta->close();

        $verificar = $conexao->prepare(
            'SELECT id FROM alertas WHERE id = ?'
        );
        $verificar->bind_param('i', $id);
        $verificar->execute();
        $existe = $verificar->get_result()->num_rows > 0;
        $verificar->close();

        if (!$existe) {
            responder(['erro' => 'Alerta não encontrado.'], 404);
        }

        responder(['mensagem' => 'Alerta atualizado com sucesso.']);
    }

    if ($metodo === 'DELETE') {
        $dados = obterDados();
        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id || $id < 1) {
            responder(['erro' => 'ID do alerta inválido.'], 422);
        }

        $consulta = $conexao->prepare(
            'DELETE FROM alertas WHERE id = ?'
        );
        $consulta->bind_param('i', $id);
        $consulta->execute();
        $afetados = $consulta->affected_rows;
        $consulta->close();

        if ($afetados === 0) {
            responder(['erro' => 'Alerta não encontrado.'], 404);
        }

        responder(['mensagem' => 'Alerta excluído com sucesso.']);
    }

    header('Allow: GET, POST, PUT, DELETE');
    responder(['erro' => 'Método não permitido.'], 405);

} catch (mysqli_sql_exception $erro) {
    if ((int) $erro->getCode() === 1062) {
        responder(['erro' => 'Já existe um alerta com esse código.'], 409);
    }

    error_log($erro->getMessage());
    responder(['erro' => 'Erro ao acessar o banco de dados.'], 500);

} catch (Throwable $erro) {
    error_log($erro->getMessage());
    responder(['erro' => 'Ocorreu um erro interno.'], 500);
}
