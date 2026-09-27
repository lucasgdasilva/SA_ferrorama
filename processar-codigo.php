<?php

session_start();

require_once "config/conexao.php";


// Verifica se existe uma recuperação em andamento
if (!isset($_SESSION['recuperacao_id'])) {
    header("Location: recuperar-senha.php");
    exit;
}


// Recebe o código digitado
$codigo = $_POST['codigo'] ?? '';


// Verifica se o código foi preenchido
if (empty($codigo)) {
    header("Location: verificar-codigo.php?status=codigo_invalido");
    exit;
}


// Pega o ID do usuário da sessão
$id = $_SESSION['recuperacao_id'];


// Busca o código salvo e sua validade
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


// Verifica se o usuário existe
if (!$usuario) {
    unset($_SESSION['recuperacao_id']);

    header("Location: recuperar-senha.php");
    exit;
}


// Verifica se existe um código salvo
if (
    empty($usuario['codigo_recuperacao']) ||
    empty($usuario['codigo_expira_em'])
) {
    header("Location: verificar-codigo.php?status=codigo_invalido");
    exit;
}


// Verifica se o código expirou
if (strtotime($usuario['codigo_expira_em']) < time()) {

    header("Location: verificar-codigo.php?status=codigo_expirado");
    exit;
}


// Compara o código digitado com o hash salvo
if (!password_verify($codigo, $usuario['codigo_recuperacao'])) {

    header("Location: verificar-codigo.php?status=codigo_invalido");
    exit;
}


// Código correto!

// Cria uma autorização temporária para redefinir a senha
$_SESSION['codigo_verificado'] = true;


// Remove o código usado do banco
$stmt = $conexao->prepare(
    "UPDATE usuarios
     SET codigo_recuperacao = NULL,
         codigo_expira_em = NULL
     WHERE id = ?"
);

$stmt->bind_param("i", $id);
$stmt->execute();


// Vai para a tela de redefinição da senha
header("Location: redefinir-senha.php");
exit;