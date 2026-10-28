
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

function validarSensor($dados) {
    foreach (['codigo', 'tipo', 'status', 'linha'] as $campo) {
        if (!isset($dados[$campo]) || trim((string) $dados[$campo]) === '') {
            responder(['erro' => 'Preencha todos os campos obrigatórios.'], 422);
        }
    }

    $tipos = [
        'Sensor de velocidade',
        'Sensor de proximidade',
        'Sensor de umidade',
        'Sensor de temperatura',
        'Sensor de falha'
    ];

    $statusPermitidos = ['OK', 'Falha', 'Em manutenção'];

    if (!in_array($dados['tipo'], $tipos, true)) {
        responder(['erro' => 'Tipo de sensor inválido.'], 422);
    }

    if (!in_array($dados['status'], $statusPermitidos, true)) {
        responder(['erro' => 'Status do sensor inválido.'], 422);
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
            'SELECT s.id, s.codigo, s.tipo, s.status,
                    s.linha_id, l.nome AS linha
             FROM sensores s
             INNER JOIN linhas l ON l.id = s.linha_id
             ORDER BY s.id DESC'
        );

        responder($consulta->fetch_all(MYSQLI_ASSOC));
    }

    if ($metodo === 'POST') {
        $dados = obterDados();
        validarSensor($dados);

        $codigo = trim($dados['codigo']);
        $tipo = $dados['tipo'];
        $status = $dados['status'];
        $linhaId = obterIdLinha($conexao, trim($dados['linha']));

        $consulta = $conexao->prepare(
            'INSERT INTO sensores (codigo, tipo, status, linha_id)
             VALUES (?, ?, ?, ?)'
        );
        $consulta->bind_param('sssi', $codigo, $tipo, $status, $linhaId);
        $consulta->execute();

        $id = $conexao->insert_id;
        $consulta->close();

        responder([
            'mensagem' => 'Sensor cadastrado com sucesso.',
            'id' => $id
        ], 201);
    }

    if ($metodo === 'PUT') {
        $dados = obterDados();
        validarSensor($dados);

        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id || $id < 1) {
            responder(['erro' => 'ID do sensor inválido.'], 422);
        }

        $codigo = trim($dados['codigo']);
        $tipo = $dados['tipo'];
        $status = $dados['status'];
        $linhaId = obterIdLinha($conexao, trim($dados['linha']));

        $consulta = $conexao->prepare(
            'UPDATE sensores
             SET codigo = ?, tipo = ?, status = ?, linha_id = ?
             WHERE id = ?'
        );
        $consulta->bind_param('sssii', $codigo, $tipo, $status, $linhaId, $id);
        $consulta->execute();
        $consulta->close();

        $verificar = $conexao->prepare(
            'SELECT id FROM sensores WHERE id = ?'
        );
        $verificar->bind_param('i', $id);
        $verificar->execute();
        $existe = $verificar->get_result()->num_rows > 0;
        $verificar->close();

        if (!$existe) {
            responder(['erro' => 'Sensor não encontrado.'], 404);
        }

        responder(['mensagem' => 'Sensor atualizado com sucesso.']);
    }

    if ($metodo === 'DELETE') {
        $dados = obterDados();
        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id || $id < 1) {
            responder(['erro' => 'ID do sensor inválido.'], 422);
        }

        $consulta = $conexao->prepare(
            'DELETE FROM sensores WHERE id = ?'
        );
        $consulta->bind_param('i', $id);
        $consulta->execute();
        $afetados = $consulta->affected_rows;
        $consulta->close();

        if ($afetados === 0) {
            responder(['erro' => 'Sensor não encontrado.'], 404);
        }

        responder(['mensagem' => 'Sensor excluído com sucesso.']);
    }

    header('Allow: GET, POST, PUT, DELETE');
    responder(['erro' => 'Método não permitido.'], 405);

} catch (mysqli_sql_exception $erro) {
    if ((int) $erro->getCode() === 1062) {
        responder(['erro' => 'Já existe um sensor com esse código.'], 409);
    }

    error_log($erro->getMessage());
    responder(['erro' => 'Erro ao acessar o banco de dados.'], 500);

} catch (Throwable $erro) {
    error_log($erro->getMessage());
    responder(['erro' => 'Ocorreu um erro interno.'], 500);
}
