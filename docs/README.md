# TrainPass – Sistema de Monitoramento Ferroviário

1. Identificação

Nome do projeto: TrainPass – Sistema de Monitoramento Ferroviário

Integrantes:

Guilherme Schroeder, Lucas Gabriel da Silva e Lukas Fischer Stolle

Turma: T TDES 24/M6

Professor: Ewerton Cercal

2. Instalação

2.1. Requisitos

- XAMPP instalado.  
- Navegador atualizado.  
- Projeto baixado ou clonado do GitHub  

2.2. Passo a passo da instalação

1 - Baixe ou clone o repositório.  
2 - Coloque a pasta do projeto dentro de "htdocs", na instalação do XAMPP.  
3 - Abra o XAMPP e inicie o Apache e o MySQL.  
4 - Acesse o phpMyAdmin pelo navegador.  
5 - Crie o banco de dados trainpass.  
6 - Importe o arquivo SQL disponibilizado na pasta do projeto.  
7 - Configura as configurações de conexão com o banco de dados no arquivo de configuração.  
8 - Acesse o sistema pelo navegador: http://localhost/trainpass/  

3. Usuário de teste

Administrador - | Login de teste | | Senha de teste |
Operador - | Login de teste | | Senha de teste |

4. Telas

4.1. Login e cadastro (permite o usuário criar uma conta ou logar em uma conta existente. Abaixo também é possível o usuário ter a função de recuperação de sua senha).  

4.2. Painel principal (Dashboard, basicamente a tela principal que pode direcionar o usuário para o resto das telas do sistema).

4.3. Gerenciamento de trens (Cadastro, consulta e gerenciamento dos trens).

4.4. Gerenciamento de linhas (Visualização e gerenciamento das linhas ferroviárias).

4.5. Sensores (Monitoramento das informações coletadas pelos sensores).

4.6. Alertas (Exibição de alertas relacionados às condições dos trens e da operação).

4.7. Relatórios (Apresentação de dados e informações sobre o funcionamento do sistema).

4.8. Perfil (Visualização e edição das informações da conta).

5. Decisões tomadas e justificativas

- Utilização de PHP, pois permite a comunicação entre o sistema e o banco de dados.
- Utilização do MySQL, para armazenar os dados.
- Criação de uma tela de login, para que o acesso ao sistema seja feito por usuários cadastrados.
- Desenvolvimento de um layout responsivo em algumas telas, para que o sistema de adapte a diferentes tamanhos de tela
- Utilização de uma identidade visual baseada em tons de azul, para transmitir uma aparência tecnológica e profissional.
- Separação das funcionalidades em diferentes telas, para facilitar a navegação e evitar que muitas informações fiquem concentradas em uma única página.
- Implementação de um sistema de alertas, para destacar possíveis problemas identificados durante o monitoramento ferroviário.
- Desenvolvimento de uma tela de relatórios, para reunir informações importantes e facilitar o acompanhamento da operação ferroviária.
- Separação dos arquivos CSS, JavaScript e PHP, para melhorar a organização do projeto.
- Criação de uma tela de perfil, para permitir a visualização e alteração dos dados da conta.

6. Limitações

- Relatórios de sensores não estão funcionando como desejado.
- Falta design responsivo (adaptação para telas mobile) na maioria das telas.
- Na tela de perfil tem um botao de "configurações" que não leva a lugar nenhum.

7. Registro de IA

A inteligência artificial foi uma ferramenta de apoio durante a criação do TrainPass. Ela foi utilizada em alguns momentos para ajudar a desenvolver funcionalidades, melhorar partes do código, resolver problemas que apareceram e dar ideias para o projeto.

Mesmo com essa ajuda, todas as alterações foram avaliadas pela equipe, que ficou responsável por escolher o que seria utilizado e garantir que o sistema funcionasse como esperado.








