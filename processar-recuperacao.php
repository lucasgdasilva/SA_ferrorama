<?php

session_start();

require_once "config/conexao.php";
require_once "config/email-config.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/SMTP.php";


$email = $_POST['email'] ?? '';

if (empty($email)) {
    header("Location: recuperar-senha.php?status=email_nao_encontrado");
    exit;
}


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


if (!$usuario) {
    header("Location: recuperar-senha.php?status=email_nao_encontrado");
    exit;
}


$_SESSION['recuperacao_id'] = $usuario['id'];


$codigo = (string) random_int(100000, 999999);


$codigoHash = password_hash(
    $codigo,
    PASSWORD_DEFAULT
);


$expiracao = date(
    "Y-m-d H:i:s",
    time() + (10 * 60)
);


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


$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;

    $mail->Username = $emailRemetente;
    $mail->Password = $senhaApp;

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom(
        $emailRemetente,
        "TrainPass"
    );

    $mail->addAddress(
        $usuario['email'],
        $usuario['nome']
    );

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

    $mail->AltBody =
        "Seu código de recuperação de senha do TrainPass é: "
        . $codigo
        . ". Esse código é válido por 10 minutos.";


    $mail->send();

    header("Location: verificar-codigo.php");
    exit;


} catch (Exception $erro) {

    header("Location: recuperar-senha.php?status=erro_envio");
    exit;
}