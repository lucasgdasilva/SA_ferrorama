<?php

session_start();

require_once "config/conexao.php";

if (!isset($_SESSION['recuperacao_id'])) {
    header("Location: recuperar-senha.php");
    exit;
}

$codigo = $_POST['codigo'] ?? '';

if (empty($codigo)) {
    header("Location: verificar-codigo.php?status=codigo_invalido");
    exit;
}

$id = $_SESSION['recuperacao_id'];

$stmt = $conexao->prepare(
    "SELECT codigo_recuperacao, codigo_expira_em
     FROM usuarios
     WHERE id = ?
     LIMIT 1"
);

$stmt->bind_param("i", $id);
$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();


if (!$usuario) {
    unset($_SESSION['recuperacao_id']);

    header("Location: recuperar-senha.php");
    exit;
}

if (
    empty($usuario['codigo_recuperacao']) ||
    empty($usuario['codigo_expira_em'])
) {
    header("Location: verificar-codigo.php?status=codigo_invalido");
    exit;
}

if (strtotime($usuario['codigo_expira_em']) < time()) {

    header("Location: verificar-codigo.php?status=codigo_expirado");
    exit;
}

if (!password_verify($codigo, $usuario['codigo_recuperacao'])) {

    header("Location: verificar-codigo.php?status=codigo_invalido");
    exit;
}


$_SESSION['codigo_verificado'] = true;

$stmt = $conexao->prepare(
    "UPDATE usuarios
     SET codigo_recuperacao = NULL,
         codigo_expira_em = NULL
     WHERE id = ?"
);

$stmt->bind_param("i", $id);
$stmt->execute();


header("Location: redefinir-senha.php");
exit;