<?php

session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

require_once "config/conexao.php";

$usuario_id = $_SESSION['usuario_id'];

$sql = "SELECT nome, email, foto
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

?>

<!doctype html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TrainPass | Perfil</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="informacoes-conta.css" />
    <script type="text/javascript" src="trocar-tema.js" defer></script>
</head>

<body>
    <header>
        <a href="dashboard.php" class="logo">
            <img src="assets/logo.png" alt="Logo do TrainPass" width="36px" height="36px" />
            <p>TrainPass</p>
        </a>
        <div class="opcoes-header">
            <div class="configuracoes-dropdown">
                <div class="engrenagem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path
                            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                </div>
                <div class="opcoes">
                    <div class="tema">
                        <p>Tema claro</p>
                        <button id="botao-switch">
                            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px"
                                fill="#e3e3e3">
                                <path
                                    d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm85-75q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm115-85Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px"
                                fill="#e3e3e3">
                                <path
                                    d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm485-75q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-285-85Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="notificacoes">
                <div class="icone-notif">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path
                            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                    </svg>
                </div>
            </div>
            <div class="perfil">
                <a href="perfil.php" class="icone-perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                </a>
            </div>
        </div>
    </header>
    <main>
        <div class="espaco-conteudo">
            <div class="container">
                <h2 class="titulo">Editar informações da conta</h2>
                <?php if (isset($_GET['status'])): ?>
                    <?php if ($_GET['status'] === 'sucesso'): ?>
                        <p class="aviso" id="sucesso">Informações atualizadas com sucesso!</p>
                    <?php elseif ($_GET['status'] === 'email_existente'): ?>
                        <p class="aviso">Este e-mail já está sendo usado por outro usuário.</p>
                    <?php endif; ?>
                <?php endif; ?>
                <form action="atualizar-informacoes.php" method="POST" enctype="multipart/form-data" class="formulario">
                    <p>Foto de perfil</p>
                    <div class="espaco-foto">
                        <div class="foto-container">
                            <img src="<?= htmlspecialchars(
                                $usuario['foto'] ?? 'assets/perfil-default.png'
                            ) ?>" alt="Foto de perfil" id="foto-atual" width="72px" />
                        </div>
                        <div class="opcoes-foto">
                            <label for="foto-perfil" class="botao" id="selecionar-foto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-upload" viewBox="0 0 16 16">
                                    <path
                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                    <path
                                        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                </svg>
                                <p>Enviar foto</p>
                            </label>
                            <input type="file" id="foto-perfil" name="foto" accept="image/jpeg,image/png,image/webp" />
                            <button type="submit" name="remover_foto" value="1" formaction="remover-foto.php"
                                onclick="return confirm('Deseja realmente remover sua foto de perfil?')" class="botao"
                                id="remover">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                                <p>Remover foto</p>
                            </button>
                        </div>
                    </div>

                    <label for="nome">Nome</label>
                    <input type="text" id="nome" name="nome" value="<?= htmlspecialchars($usuario['nome']) ?>"
                        required />
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" value="<?= htmlspecialchars($usuario['email']) ?>"
                        required />
                    <button type="submit" class="botao" id="atualizar">Atualizar Informações</button>
                </form>
            </div>
             <div class="retornar">
                <a href="perfil.php">Voltar</a>
            </div>
        </div>
    </main>
    <script>
    const inputFoto = document.getElementById("foto-perfil");
    const fotoAtual = document.getElementById("foto-atual");

    inputFoto.addEventListener("change", function () {

        if (inputFoto.files.length === 0) {
            return;
        }

        const arquivo = inputFoto.files[0];
        const url = URL.createObjectURL(arquivo);
        fotoAtual.src = url;
    });
</script>
</body>