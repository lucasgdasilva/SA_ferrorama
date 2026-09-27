<?php

session_start();

require_once "config/conexao.php";


// ==========================================
// IDENTIFICA QUAL USUÁRIO ESTÁ ALTERANDO A SENHA
// ==========================================

$usuarioId = $_SESSION['usuario_id'] ?? null;


// Caso seja uma recuperação de senha
if (
    !$usuarioId &&
    isset($_SESSION['recuperacao_id']) &&
    isset($_SESSION['codigo_verificado']) &&
    $_SESSION['codigo_verificado'] === true
) {
    $usuarioId = $_SESSION['recuperacao_id'];
}


// Se não houver nenhuma autorização
if (!$usuarioId) {
    header("Location: login.php");
    exit;
}


// ==========================================
// RECEBE AS SENHAS
// ==========================================

$senha = $_POST['senha'] ?? '';
$confirmarSenha = $_POST['confirmar_senha'] ?? '';


// Verifica se os campos foram preenchidos
if (empty($senha) || empty($confirmarSenha)) {
    header("Location: redefinir-senha.php?status=erro");
    exit;
}


// ==========================================
// VERIFICA SE AS SENHAS SÃO IGUAIS
// ==========================================

if ($senha !== $confirmarSenha) {
    header("Location: redefinir-senha.php?status=senhas_diferentes");
    exit;
}


// ==========================================
// CRIA O HASH DA NOVA SENHA
// ==========================================

$senhaHash = password_hash(
    $senha,
    PASSWORD_DEFAULT
);


// ==========================================
// ATUALIZA A SENHA NO BANCO
// ==========================================

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


// Verifica se houve algum erro
if ($stmt->errno) {
    header("Location: redefinir-senha.php?status=erro");
    exit;
}


// ==========================================
// FINALIZA A RECUPERAÇÃO, SE EXISTIR
// ==========================================

unset($_SESSION['recuperacao_id']);
unset($_SESSION['codigo_verificado']);


// ==========================================
// REDIRECIONA PARA O LOGIN
// ==========================================

header("Location: login.php?status=senha_alterada");
exit;