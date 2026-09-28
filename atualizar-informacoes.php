<?php

session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

require_once "config/conexao.php";

$usuario_id = $_SESSION['usuario_id'];

$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');

if ($nome === '' || $email === '') {
    die("Preencha todos os campos.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("E-mail inválido.");
}

$sql = "SELECT foto
        FROM usuarios
        WHERE id = ?";

$stmt = $conexao->prepare($sql);

$stmt->bind_param(
    "i",
    $usuario_id
);

$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

if (!$usuario) {
    die("Usuário não encontrado.");
}

$fotoAntiga = $usuario['foto'];

$foto = $fotoAntiga;

$novaFoto = false;


if (
    isset($_FILES['foto']) &&
    $_FILES['foto']['error'] !== UPLOAD_ERR_NO_FILE
) {

    if ($_FILES['foto']['error'] !== UPLOAD_ERR_OK) {
        die("Erro ao enviar a foto.");
    }

    if ($_FILES['foto']['size'] > 5 * 1024 * 1024) {
        die("A foto deve ter no máximo 5 MB.");
    }

    $imagem = getimagesize(
        $_FILES['foto']['tmp_name']
    );

    if ($imagem === false) {
        die("O arquivo enviado não é uma imagem válida.");
    }

    $tiposPermitidos = [
        IMAGETYPE_JPEG => 'jpg',
        IMAGETYPE_PNG => 'png',
        IMAGETYPE_WEBP => 'webp'
    ];

    $tipo = $imagem[2];

    if (!isset($tiposPermitidos[$tipo])) {
        die("Formato de imagem não permitido.");
    }

    $pasta = __DIR__ . "/uploads/perfis/";

    if (!is_dir($pasta)) {
        mkdir($pasta, 0755, true);
    }

    $nomeArquivo = bin2hex(
        random_bytes(16)
    ) . "." . $tiposPermitidos[$tipo];


    $caminhoCompleto = $pasta . $nomeArquivo;

    if (!move_uploaded_file(
        $_FILES['foto']['tmp_name'],
        $caminhoCompleto
    )) {
        die("Não foi possível salvar a foto.");
    }

    $foto = "uploads/perfis/" . $nomeArquivo;

    $novaFoto = true;
}

$sql = "UPDATE usuarios
        SET nome = ?, email = ?, foto = ?
        WHERE id = ?";

$stmt = $conexao->prepare($sql);

$stmt->bind_param(
    "sssi",
    $nome,
    $email,
    $foto,
    $usuario_id
);


try {

    $stmt->execute();

    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_email'] = $email;


    if ($novaFoto && !empty($fotoAntiga)) {

        $caminhoFotoAntiga = __DIR__ . "/" . $fotoAntiga;

        if (file_exists($caminhoFotoAntiga)) {
            unlink($caminhoFotoAntiga);
        }
    }


    header(
        "Location: informacoes-conta.php?status=sucesso"
    );

    exit;


} catch (mysqli_sql_exception $erro) {

    if ($erro->getCode() === 1062) {

        if ($novaFoto && !empty($foto)) {

            $caminhoNovaFoto = __DIR__ . "/" . $foto;

            if (file_exists($caminhoNovaFoto)) {
                unlink($caminhoNovaFoto);
            }
        }

        header(
            "Location: informacoes-conta.php?status=email_existente"
        );

        exit;
    }

    if ($novaFoto && !empty($foto)) {

        $caminhoNovaFoto = __DIR__ . "/" . $foto;

        if (file_exists($caminhoNovaFoto)) {
            unlink($caminhoNovaFoto);
        }
    }

    die("Erro ao atualizar as informações.");
}

?>