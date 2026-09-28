<?php

session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

require_once "config/conexao.php";

$usuario_id = $_SESSION['usuario_id'];


$sql = "SELECT foto
        FROM usuarios
        WHERE id = ?";

$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

if (!$usuario) {
    die("Usuário não encontrado.");
}

$foto = $usuario['foto'];

$sql = "UPDATE usuarios
        SET foto = NULL
        WHERE id = ?";

$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $usuario_id);

if (!$stmt->execute()) {
    die("Erro ao remover a foto.");
}


if (!empty($foto)) {

    $caminhoFoto = __DIR__ . "/" . $foto;

    if (file_exists($caminhoFoto)) {
        unlink($caminhoFoto);
    }
}


header("Location: informacoes-conta.php?status=foto_removida");
exit;