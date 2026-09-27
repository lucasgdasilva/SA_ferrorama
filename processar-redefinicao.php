<?php

session_start();

require_once "config/conexao.php";


$usuarioId = $_SESSION['usuario_id'] ?? null;


if (
    !$usuarioId &&
    isset($_SESSION['recuperacao_id']) &&
    isset($_SESSION['codigo_verificado']) &&
    $_SESSION['codigo_verificado'] === true
) {
    $usuarioId = $_SESSION['recuperacao_id'];
}


if (!$usuarioId) {
    header("Location: login.php");
    exit;
}


$senha = $_POST['senha'] ?? '';
$confirmarSenha = $_POST['confirmar_senha'] ?? '';


if (empty($senha) || empty($confirmarSenha)) {
    header("Location: redefinir-senha.php?status=erro");
    exit;
}


if ($senha !== $confirmarSenha) {
    header("Location: redefinir-senha.php?status=senhas_diferentes");
    exit;
}


$senhaHash = password_hash(
    $senha,
    PASSWORD_DEFAULT
);


$stmt = $conexao->prepare(
    "UPDATE usuarios
     SET senha = ?
     WHERE id = ?"
);

$stmt->bind_param(
    "si",
    $senhaHash,
    $usuarioId
);

$stmt->execute();

if ($stmt->errno) {
    header("Location: redefinir-senha.php?status=erro");
    exit;
}

unset($_SESSION['recuperacao_id']);
unset($_SESSION['codigo_verificado']);

header("Location: login.php?status=senha_alterada");
exit;