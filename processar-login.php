<?php

session_start();

require_once "config/conexao.php";

$email = $_POST['email'];
$senha = $_POST['senha'];

$stmt = $conexao->prepare(
    "SELECT * FROM usuarios WHERE email = ? LIMIT 1"
);

$stmt->bind_param("s", $email);

$stmt->execute();

$resultado = $stmt->get_result();

$usuario = $resultado->fetch_assoc();

if (!$usuario || !password_verify($senha, $usuario['senha'])) {

    header("Location: login.php?status=credenciais");
    exit;

}

session_regenerate_id(true);

$_SESSION['usuario_id'] = $usuario['id'];
$_SESSION['usuario_nome'] = $usuario['nome'];
$_SESSION['usuario_email'] = $usuario['email'];
$_SESSION['usuario_cargo'] = $usuario['cargo'];

header("Location: dashboard.php");
exit;