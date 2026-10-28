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
    $conteudo = file_get_contents('php://input');
    $dados = json_decode($conteudo, true);

    if (!is_array($dados)) {
        responder(['erro' => 'Dados inválidos.'], 400);
    }

    return $dados;
}

function validarLinha($conexao, $nomeLinha) {
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

function validarTrem($dados) {
    $campos = ['nome', 'status', 'linha', 'modelo', 'tipo'];

    foreach ($campos as $campo) {
        if (!isset($dados[$campo]) || trim((string) $dados[$campo]) === '') {
            responder(['erro' => 'Preencha todos os campos obrigatórios.'], 422);
        }
    }

    $statusPermitidos = ['Em operação', 'Em manutenção', 'Parado'];
    $tiposPermitidos = ['Carga', 'Passageiros'];

    if (!in_array($dados['status'], $statusPermitidos, true)) {
        responder(['erro' => 'Status do trem inválido.'], 422);
    }

    if (!in_array($dados['tipo'], $tiposPermitidos, true)) {
        responder(['erro' => 'Tipo de trem inválido.'], 422);
    }
}

try {
    $metodo = $_SERVER['REQUEST_METHOD'];

    if ($metodo === 'GET') {
        $consulta = $conexao->query(
            'SELECT t.id, t.nome, t.status, t.modelo, t.tipo,
                    t.linha_id, l.nome AS linha
             FROM trens t
             INNER JOIN linhas l ON l.id = t.linha_id
             ORDER BY t.id DESC'
        );

        responder($consulta->fetch_all(MYSQLI_ASSOC));
    }

    if ($metodo === 'POST') {
        $dados = obterDados();
        validarTrem($dados);

        $linhaId = validarLinha($conexao, trim($dados['linha']));
        $nome = trim($dados['nome']);
        $status = $dados['status'];
        $modelo = trim($dados['modelo']);
        $tipo = $dados['tipo'];

        $consulta = $conexao->prepare(
            'INSERT INTO trens (nome, status, linha_id, modelo, tipo)
             VALUES (?, ?, ?, ?, ?)'
        );

        $consulta->bind_param(
            'ssiss',
            $nome,
            $status,
            $linhaId,
            $modelo,
            $tipo
        );

        $consulta->execute();
        $id = $conexao->insert_id;
        $consulta->close();

        responder([
            'mensagem' => 'Trem cadastrado com sucesso.',
            'id' => $id
        ], 201);
    }

    if ($metodo === 'PUT') {
        $dados = obterDados();
        validarTrem($dados);

        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id || $id < 1) {
            responder(['erro' => 'ID do trem inválido.'], 422);
        }

        $linhaId = validarLinha($conexao, trim($dados['linha']));
        $nome = trim($dados['nome']);
        $status = $dados['status'];
        $modelo = trim($dados['modelo']);
        $tipo = $dados['tipo'];

        $consulta = $conexao->prepare(
            'UPDATE trens
             SET nome = ?, status = ?, linha_id = ?, modelo = ?, tipo = ?
             WHERE id = ?'
        );

        $consulta->bind_param(
            'ssissi',
            $nome,
            $status,
            $linhaId,
            $modelo,
            $tipo,
            $id
        );

        $consulta->execute();
        $afetados = $consulta->affected_rows;
        $consulta->close();

        $verificar = $conexao->prepare(
            'SELECT id FROM trens WHERE id = ?'
        );
        $verificar->bind_param('i', $id);
        $verificar->execute();
        $existe = $verificar->get_result()->num_rows > 0;
        $verificar->close();

        if (!$existe) {
            responder(['erro' => 'Trem não encontrado.'], 404);
        }

        responder(['mensagem' => 'Trem atualizado com sucesso.']);
    }

    if ($metodo === 'DELETE') {
        $dados = obterDados();
        $id = filter_var($dados['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id || $id < 1) {
            responder(['erro' => 'ID do trem inválido.'], 422);
        }

        $consulta = $conexao->prepare(
            'DELETE FROM trens WHERE id = ?'
        );
        $consulta->bind_param('i', $id);
        $consulta->execute();
        $afetados = $consulta->affected_rows;
        $consulta->close();

        if ($afetados === 0) {
            responder(['erro' => 'Trem não encontrado.'], 404);
        }

        responder(['mensagem' => 'Trem excluído com sucesso.']);
    }

    header('Allow: GET, POST, PUT, DELETE');
    responder(['erro' => 'Método não permitido.'], 405);

} catch (mysqli_sql_exception $erro) {
    if ((int) $erro->getCode() === 1062) {
        responder(['erro' => 'Já existe um trem com esse nome.'], 409);
    }

    error_log($erro->getMessage());
    responder(['erro' => 'Erro ao acessar o banco de dados.'], 500);

} catch (Throwable $erro) {
    error_log($erro->getMessage());
    responder(['erro' => 'Ocorreu um erro interno.'], 500);
}
