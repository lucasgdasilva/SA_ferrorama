# TrainPass – Sistema de Monitoramento Ferroviário

1. Identificação

Nome do projeto: TrainPass – Sistema de Monitoramento Ferroviário

Integrantes:

Guilherme Schroeder, Lucas Gabriel da Silva e Lukas Fischer Stolle

Turma: T TDES 2024/1 M6

Professor: Ewerton Cercal

2. Instalação

2.1. Requisitos

- XAMPP instalado.  
- Navegador atualizado.  
- Projeto baixado ou clonado do GitHub  

2.2. Passo a passo da instalação

1 - Baixe ou clone o repositório.  
2 - Abra a pasta do projeto dentro de "htdocs", na instalação do XAMPP.  
3 - Abra o XAMPP e inicie o Apache e o MySQL.  
4 - Acesse o phpMyAdmin pelo navegador. (localhost/phpmyadmin).
5 - Importe o arquivo SQL disponibilizado na pasta do projeto (database/trainpass.sql).  
6 - Execute o código SQL no phpMyAdmin para criar o banco.
7 - Tenha certeza de que as conexões com o banco de dados estão sendo feitas corretamente pelos arquivos de conexão PHP. 
8 - Acesse o sistema pelo navegador: http://localhost/SA_ferrorama/  

3. Usuário de teste

Administrador - | Login de teste | | Senha de teste |
Operador - | Login de teste | | Senha de teste |

4. Telas

4.1. Login e cadastro (permite o usuário criar uma conta ou logar em uma conta existente. Abaixo também há uma função de recuperação de senha).  

4.2. Painel principal (Dashboard, que permite que o usuário navegue pelas telas principais).

4.3. Gerenciamento de trens (Cadastro, consulta e gerenciamento dos trens).

4.4. Gerenciamento de linhas (Visualização e gerenciamento das linhas ferroviárias).

4.5. Sensores (Monitoramento das informações coletadas pelos sensores).

4.6. Alertas (Exibição de alertas relacionados às condições dos trens e da operação).

4.7. Relatórios (Apresentação de dados e informações sobre o funcionamento do sistema).

4.8. Perfil (Visualização e edição das informações da conta).

5. Decisões tomadas e justificativas

- Utilização de PHP, pois permite a comunicação entre o sistema e o banco de dados.
- Utilização do MySQL, para gerenciar o banco de dados.
- Criação de uma tela de login, para que o acesso ao sistema seja feito apenas por usuários cadastrados.
- Utilização de uma identidade visual baseada em tons de azul, para transmitir uma aparência tecnológica e profissional. Bem como uma fonte limpa e legível.
- Navegação baseada em um dashboard principal dinâmico, para facilitar a navegação e evitar a criação de muitos arquivos separados.
- Integração com uma API própria que disponibiliza os dados do banco em JSON para serem acessados pelo sistema. (Exemplo: Consulta de dados de trens na API: http://localhost/SA_ferrorama/api/trens.php)

6. Limitações conhecidas

- Relatórios de sensores não foram implementados por seguirem uma lógica diferente dos demais relatórios, exigindo mais trabalho. Até o momento não foi implementado por limitação de tempo.
- Falta design responsivo (adaptação para telas mobile) na maioria das telas. Priorizamos a funcionalidade geral do sistema em desktop para não correr o risco de ficar sem tempo. Adicionaríamos responsividade se tivesse tempo.
- Na tela de perfil há um botão de "configurações" que foi adicionado para implementação posterior, mas não conseguimos encontrar funcionalidade para ele, pois as configurações mais importantes já podem ser acessadas de outros modos. Decidimos manter o botão ali para não quebrar o padrão visual, apesar de que ele não leva para lugar nenhum.

7. Registro de IA

A inteligência artificial foi uma ferramenta de apoio durante a criação do TrainPass. Ela foi para ajudar a desenvolver funcionalidades, melhorar partes do código, resolver problemas que apareceram e dar ideias para o projeto.

Mesmo com auxílio da IA, todas as alterações foram avaliadas pela equipe, que ficou responsável por escolher o que seria utilizado e garantir que o sistema funcionasse como esperado. 

Nenhuma implementação foi feita pela IA sem que antes passasse por revisão e autorização prévia da equipe. Nós mantivemos backups seguros de versões funcionais em caso de alguma adição feita por IA dar errado.








