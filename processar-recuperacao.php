<?php

session_start();

require_once "config/conexao.php";
require_once "config/email-config.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/SMTP.php";


// Recebe o e-mail do formulário
$email = $_POST['email'] ?? '';

if (empty($email)) {
    header("Location: recuperar-senha.php?status=email_nao_encontrado");
    exit;
}


// Procura o usuário pelo e-mail
$stmt = $conexao->prepare(
    "SELECT id, nome, email
     FROM usuarios
     WHERE email = ?
     LIMIT 1"
);

$stmt->bind_param("s", $email);
$stmt->execute();

$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();


// Se o e-mail não existir
if (!$usuario) {
    header("Location: recuperar-senha.php?status=email_nao_encontrado");
    exit;
}


// Guarda temporariamente o ID do usuário que está recuperando a senha
$_SESSION['recuperacao_id'] = $usuario['id'];


// Gera um código aleatório de 6 dígitos
$codigo = (string) random_int(100000, 999999);


// Cria um hash do código para armazenar no banco
$codigoHash = password_hash(
    $codigo,
    PASSWORD_DEFAULT
);


// Código válido por 10 minutos
$expiracao = date(
    "Y-m-d H:i:s",
    time() + (10 * 60)
);


// Salva o código e a validade no banco
$stmt = $conexao->prepare(
    "UPDATE usuarios
     SET codigo_recuperacao = ?,
         codigo_expira_em = ?
     WHERE id = ?"
);

$stmt->bind_param(
    "ssi",
    $codigoHash,
    $expiracao,
    $usuario['id']
);

$stmt->execute();


// =============================
// PHPMailer
// =============================

$mail = new PHPMailer(true);

try {

    // Configuração SMTP do Gmail
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;

    // ==========================================
    // COLOQUE SEU E-MAIL AQUI
    // ==========================================
    $mail->Username = $emailRemetente;


    // ==========================================
    // COLOQUE SUA NOVA SENHA DE APP AQUI
    // NÃO ENVIE ESSA SENHA NO CHAT
    // ==========================================
    $mail->Password = $senhaApp;


    // Conexão segura
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;


    // Remetente
    $mail->setFrom(
        $emailRemetente,
        "TrainPass"
    );


    // Destinatário
    $mail->addAddress(
        $usuario['email'],
        $usuario['nome']
    );


    // E-mail em HTML
    $mail->isHTML(true);

    $mail->CharSet = 'UTF-8';

    $mail->Subject = "Código de recuperação de senha - TrainPass";


    $mail->Body = "
        <h2>Recuperação de senha</h2>

        <p>Olá, {$usuario['nome']}!</p>

        <p>
            Você solicitou a recuperação da sua senha
            do TrainPass.
        </p>

        <p>
            Seu código de recuperação é:
        </p>

        <h1>{$codigo}</h1>

        <p>
            Esse código é válido por 10 minutos.
        </p>

        <p>
            Se você não solicitou a recuperação da senha,
            ignore este e-mail.
        </p>
    ";


    // Versão para clientes que não exibem HTML
    $mail->AltBody =
        "Seu código de recuperação de senha do TrainPass é: "
        . $codigo
        . ". Esse código é válido por 10 minutos.";


    // Envia o e-mail
    $mail->send();


    // Se enviou com sucesso,
    // vai para a tela de verificação
    header("Location: verificar-codigo.php");
    exit;


} catch (Exception $erro) {

    // Se houver erro no envio
    header("Location: recuperar-senha.php?status=erro_envio");
    exit;
}