<?php

require_once "config/conexao.php";

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$confirmarSenha = $_POST['confirmar-senha'];

if ($senha !== $confirmarSenha) {

    header("Location: cadastro.php?status=senhas_diferentes");
    exit;

}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$cargo = "administrador";

$stmt = $conexao->prepare(
    "INSERT INTO usuarios (nome, email, senha, cargo)
     VALUES (?, ?, ?, ?)"
);

$stmt->bind_param(
    "ssss",
    $nome,
    $email,
    $senhaHash,
    $cargo
);

try {

    $stmt->execute();

    header("Location: login.php?status=cadastro_sucesso");
    exit;

} catch (mysqli_sql_exception $erro) {

    if ($erro->getCode() === 1062) {

        header("Location: cadastro.php?status=email_existente");
        exit;

    }

    die("Erro ao cadastrar usuário.");
}