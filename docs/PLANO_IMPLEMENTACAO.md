
# Train Pass - Arthur Adriano, Guilherme Schroeder, Lucas Gabriel e Lukas Fischer

# Seção 1

Os links dos nossos mockups se encontram em:

Desktop: https://canva.link/j6neiulpjei0ncu

Mobile: https://canva.link/6tskxjpolkjjmq6


Resumo do sistema - É um sistema para as pessoas se informarem melhor e terem acesso fácil ao meio de locomoção em ferrovias (trens), feito tanto para passageiros quanto para os maquinistas e administradores. Seu diferencial é o acompanhamento em tempo real, segurança, organização e fácil acesso aos usuários.

Decisões técnicas: O sistema será desenvolvido com base em documentos HTML e CSS separados, para manter organização no que se refere à nomenclatura e estrutura. Também utilizaremos scripts separados em JavaScript. Não planejamos utilizar nenhum framework, e sim desenvolver o sistema por conta própria. Caso necessário, iremos utilizar iconografia e fontes de provedores confiáveis, como Bootstrap, Google, etc.

# Seção 2

Prévia da arquitetura:

```text
raiz/
├── inicio.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   ├── icones/
│   │   └── exemplo.svg
│   └── imagens/
│       └── exemplo.png
└── paginas/
    ├── pagina1.html
    ├── pagina2.html
    └── pagina3.html
```

Justificativa: Organizar os recursos visuais em pastas (ícones, imagens, etc), junto com demais arquivos (CSS, JS)  para manter a organização.
Armazenar as diferentes páginas em uma pasta para facilitar a navegação.
Página inicial carrega na raiz do documento.

# Seção 3 - Componentes reutilizáveis identificados
Botões principais: 
Botões de ações principais, como “Entrar”, “Cadastrar”, “Voltar”, etc, apresentam a mesma estrutura e formato, podendo ser reutilizados.
Aparecem em telas como Login, Cadastro, Menus.

Container: Está presente em todas as telas.

Barra de navegação: Reaproveitar em todas as telas.

Menu de acessibilidade: Consistente em todas as telas.

# Seção 4 -  Ordem de implementação 

```text
1 - Implementação das telas gerais:

Tela 1 - Tela de login
Tela 2 - Tela de cadastro
Tela 3 - Tela de “esqueci minha senha”
Tela 4 -  Tela de perfil

2 - Implementação da tela de passageiros:

Tela 1 - Tela de trens de passageiros.

3 - Implementação das telas do maquinista:

Tela 1 - Menu de navegação do maquinista
Tela 2 - Tela de linhas
Tela 3 - Tela de trens de passageiros
Tela 4 - Tela de trens de carga
Tela 5 - Tela de alertas
Tela 6 - Tela de sensores

4 - Implementação das telas do administrador:

Tela 1 - Menu de navegação do administrador
Tela 2 - Tela de linhas
Tela 3 - Tela de trens de passageiros
Tela 4 - Tela de trens de carga
Tela 5 - Tela de alertas
Tela 6 - Tela de sensores
Tela 7 - Tela de relatórios
Tela 8 - Tela de gerenciamento de usuários

Componentes reutilizáveis:
Botões, contêineres, barra de navegação, menu de acessibilidade.
```


