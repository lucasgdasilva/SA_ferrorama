// Esse código pode ser bem complicado de entender. Vou deixar aqui comentários para auxiliar.
// - Lucas

// Esse JavaScript é responsável por gerar dinamicamente o que será visto no dashboard. Aqui a gente armazena os dados e o HTML que aparecerá
// no container principal. O JavaScript injeta o HTML dentro do container pra fazer ele aparecer na tela, e mudar quando outra tela é selecionada
// no menu de navegação lateral. Esse código também gerencia os formulários do CRUD, que permite criar, apagar, editar e exibir na tela os registros
// de cada tela.

const container = document.querySelector('.container-principal');

// Aqui se encontram os dados de cada uma das telas armazenados. O código pega eles e mostra na tela. Se editar aqui, é editado lá na tela também.

const dados = {
    trens: [
        { nome: 'TP-001', status: 'Em operação', linha: 'Linha 2', modelo: 'Modelo não informado', tipo: 'Passageiros' },
        { nome: 'TC-001', status: 'Em operação', linha: 'Linha 3', modelo: 'Modelo não informado', tipo: 'Carga' },
        { nome: 'TP-002', status: 'Em manutenção', linha: 'Linha 1', modelo: 'Modelo não informado', tipo: 'Passageiros' },
        { nome: 'TP-003', status: 'Parado', linha: 'Linha 1', modelo: 'Modelo não informado', tipo: 'Passageiros' },
        { nome: 'TC-002', status: 'Em operação', linha: 'Linha 5', modelo: 'Modelo não informado', tipo: 'Carga' },
        { nome: 'TC-003', status: 'Em manutenção', linha: 'Linha 4', modelo: 'Modelo não informado', tipo: 'Carga' },
        { nome: 'TC-004', status: 'Parado', linha: 'Linha 6', modelo: 'Modelo não informado', tipo: 'Carga' }
    ],

    linhas: [
        { nome: 'Linha 1', origem: 'Joinville', destino: 'São Francisco do Sul', status: 'Ativa' },
        { nome: 'Linha 2', origem: 'Joinville', destino: 'Corupá', status: 'Ativa' },
        { nome: 'Linha 3', origem: 'Joinville', destino: 'Mafra', status: 'Ativa' },
        { nome: 'Linha 4', origem: 'Joinville', destino: 'Araquari', status: 'Ativa' },
        { nome: 'Linha 5', origem: 'Joinville', destino: 'Guaramirim', status: 'Ativa' },
        { nome: 'Linha 6', origem: 'Joinville', destino: 'Jaraguá do Sul', status: 'Ativa' },
        { nome: 'Linha 7', origem: 'Joinville', destino: 'Blumenau', status: 'Ativa' },
        { nome: 'Linha 8', origem: 'Joinville', destino: 'Lages', status: 'Ativa' },
        { nome: 'Linha 9', origem: 'Joinville', destino: 'Barra do Sul', status: 'Ativa' }
    ],

    alertas: [
        { codigo: 'A-058', descricao: 'Obstrução da linha', linha: 'Linha 2', status: 'Ativo', gravidade: 'Alta' },
        { codigo: 'A-059', descricao: 'Chuva intensa', linha: 'Linha 3', status: 'Ativo', gravidade: 'Média' },
        { codigo: 'A-060', descricao: 'Erro no GPS/localização', linha: 'Linha 4', status: 'Ativo', gravidade: 'Média' },
        { codigo: 'A-061', descricao: 'Superlotação', linha: 'Linha 5', status: 'Ativo', gravidade: 'Alta' },
        { codigo: 'A-062', descricao: 'Trem danificado', linha: 'Linha 6', status: 'Ativo', gravidade: 'Alta' },
        { codigo: 'A-063', descricao: 'Trilho danificado', linha: 'Linha 7', status: 'Ativo', gravidade: 'Alta' },
        { codigo: 'A-064', descricao: 'Obstrução na linha', linha: 'Linha 8', status: 'Ativo', gravidade: 'Alta' }
    ],

    sensores: [
        { codigo: 'VEL-032', tipo: 'Sensor de velocidade', status: 'OK', linha: 'Linha 1' },
        { codigo: 'PROX-068', tipo: 'Sensor de proximidade', status: 'OK', linha: 'Linha 2' },
        { codigo: 'UMD-027', tipo: 'Sensor de umidade', status: 'Falha', linha: 'Linha 3' },
        { codigo: 'VEL-035', tipo: 'Sensor de velocidade', status: 'OK', linha: 'Linha 4' },
        { codigo: 'PROX-071', tipo: 'Sensor de proximidade', status: 'Falha', linha: 'Linha 5' },
        { codigo: 'UMD-030', tipo: 'Sensor de umidade', status: 'OK', linha: 'Linha 6' },
        { codigo: 'VEL-038', tipo: 'Sensor de velocidade', status: 'OK', linha: 'Linha 7' }
    ]
};

// Aqui embaixo acontece a configuração dos formulários. Os campos e opções do formulário são armazenadas aqui (por exemplo: nome, tipo, modelo, etc.) e
// depois são utilizadas para gerar os formulários.

const configuracoes = {
    trens: {
        titulo: 'Trens',
        singular: 'trem',
        campos: [
            {
                chave: 'nome',
                rotulo: 'Nome do trem',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'status',
                rotulo: 'Status',
                tipo: 'select',
                opcoes: ['Em operação', 'Em manutenção', 'Parado'],
                obrigatorio: true
            },
            {
                chave: 'linha',
                rotulo: 'Linha onde o trem se encontra',
                tipo: 'select',
                opcoes: () => dados.linhas.map(linha => linha.nome),
                obrigatorio: true
            },
            {
                chave: 'modelo',
                rotulo: 'Modelo do trem',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'tipo',
                rotulo: 'Tipo de trem',
                tipo: 'select',
                opcoes: ['Carga', 'Passageiros'],
                obrigatorio: true
            }
        ],
        nome: item => item.nome,
        descricao: item => `${item.linha} · ${item.tipo} · ${item.modelo}`,
        status: item => item.status
    },

    linhas: {
        titulo: 'Linhas',
        singular: 'linha',
        campos: [
            {
                chave: 'nome',
                rotulo: 'Nome da linha',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'origem',
                rotulo: 'Cidade de origem',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'destino',
                rotulo: 'Cidade de destino',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'status',
                rotulo: 'Status',
                tipo: 'select',
                opcoes: ['Ativa', 'Inativa', 'Em manutenção'],
                obrigatorio: true
            }
        ],
        nome: item => item.nome,
        descricao: item => `${item.origem} - ${item.destino}`,
        status: item => item.status
    },

    alertas: {
        titulo: 'Alertas',
        singular: 'alerta',
        campos: [
            {
                chave: 'codigo',
                rotulo: 'Código do alerta',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'descricao',
                rotulo: 'Descrição do alerta',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'linha',
                rotulo: 'Linha relacionada',
                tipo: 'select',
                opcoes: () => dados.linhas.map(linha => linha.nome),
                obrigatorio: true
            },
            {
                chave: 'status',
                rotulo: 'Status',
                tipo: 'select',
                opcoes: ['Ativo', 'Resolvido'],
                obrigatorio: true
            },
            {
                chave: 'gravidade',
                rotulo: 'Gravidade',
                tipo: 'select',
                opcoes: ['Baixa', 'Média', 'Alta'],
                obrigatorio: true
            }
        ],
        nome: item => item.codigo,
        descricao: item => `${item.descricao} - ${item.linha} · Gravidade: ${item.gravidade}`,
        status: item => item.status
    },

    sensores: {
        titulo: 'Sensores',
        singular: 'sensor',
        campos: [
            {
                chave: 'codigo',
                rotulo: 'Código do sensor',
                tipo: 'text',
                obrigatorio: true
            },
            {
                chave: 'tipo',
                rotulo: 'Tipo de sensor',
                tipo: 'select',
                opcoes: [
                    'Sensor de velocidade',
                    'Sensor de proximidade',
                    'Sensor de umidade',
                    'Sensor de temperatura',
                    'Sensor de falha'
                ],
                obrigatorio: true
            },
            {
                chave: 'status',
                rotulo: 'Status',
                tipo: 'select',
                opcoes: ['OK', 'Falha', 'Em manutenção'],
                obrigatorio: true
            },
            {
                chave: 'linha',
                rotulo: 'Linha',
                tipo: 'select',
                opcoes: () => dados.linhas.map(linha => linha.nome),
                obrigatorio: true
            }
        ],
        nome: item => item.codigo,
        descricao: item => `${item.tipo} · ${item.linha}`,
        status: item => item.status
    }
};

// Essa função serve para uma questão de segurança. Ela não permite que os dados digitados no formulário
// sejam interpretados como código HTML, para evitar injection.

function escaparHTML(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caractere]);
}

// Essa função aplica uma classe diferente dependendo do status do item cadastrado, simplesmente
// para alterar a cor do status (verde, cinza ou vermelho).

function classeStatus(status) {
    const valor = String(status || '').toLowerCase();

    if (
        valor.includes('operação') ||
        valor === 'ativa' ||
        valor === 'ok' ||
        valor === 'resolvido'
    ) {
        return 'status-ok';
    }

    if (
        valor.includes('manutenção') ||
        valor === 'média'
    ) {
        return 'status-manutencao';
    }

    return 'status-parado';
}

// Essa função renderiza a lsita de registros com base nos dados armazenados. Ela cria o HTML pra mostrar as informações
// e também os botões de editar e excluir.

function renderizarLista(tipo) {
    const config = configuracoes[tipo];

    if (!config) {
        return;
    }

    const itens = dados[tipo];

    const conteudoItens = itens.length
        ? itens.map((item, indice) => `
            <div class="item">
                <div class="informacoes-item">
                    <div class="trem">
                        <h3>${escaparHTML(config.nome(item))}</h3>
                        <p class="${classeStatus(config.status(item))}">
                            ${escaparHTML(config.status(item))}
                        </p>
                    </div>

                    <p>${escaparHTML(config.descricao(item))}</p>
                </div>

                <div class="acoes-item">
                    <button
                        type="button"
                        class="botao-itens"
                        data-acao="editar"
                        data-tipo="${tipo}"
                        data-indice="${indice}">
                        Editar
                    </button>

                    <button
                        type="button"
                        class="botao-itens botao-excluir"
                        data-acao="excluir"
                        data-tipo="${tipo}"
                        data-indice="${indice}">
                        Excluir
                    </button>
                </div>
            </div>
        `).join('')
        : '<p>Nenhum registro cadastrado.</p>';

    container.innerHTML = `
        <div class="cabecalho-lista">
            <h1>${config.titulo}</h1>

            <button
                type="button"
                class="botao-itens"
                data-acao="cadastrar"
                data-tipo="${tipo}">
                Cadastrar ${config.singular}
            </button>
        </div>

        <div class="lista-registros">
            ${conteudoItens}
        </div>
    `;
}

// Essa função gera os campos dos formulários das telas de editar e adicionar registros.

function gerarCampo(campo, valorAtual = '') {
    const obrigatorio = campo.obrigatorio ? 'required' : '';

    if (campo.tipo === 'select') {
        const opcoes = typeof campo.opcoes === 'function'
            ? campo.opcoes()
            : campo.opcoes;

        return `
            <label class="campo-formulario">
                <span>${escaparHTML(campo.rotulo)}</span>

                <select
                    name="${escaparHTML(campo.chave)}"
                    ${obrigatorio}>

                    <option value="">Selecione...</option>

                    ${opcoes.map(opcao => `
                        <option
                            value="${escaparHTML(opcao)}"
                            ${opcao === valorAtual ? 'selected' : ''}>
                            ${escaparHTML(opcao)}
                        </option>
                    `).join('')}

                </select>
            </label>
        `;
    }

    return `
        <label class="campo-formulario">
            <span>${escaparHTML(campo.rotulo)}</span>

            <input
                type="text"
                name="${escaparHTML(campo.chave)}"
                value="${escaparHTML(valorAtual)}"
                ${obrigatorio}>
        </label>
    `;
}

// Essa função renderiza os formulários de edição e cadastro de dados.

function renderizarFormulario(tipo, indice = null) {
    const config = configuracoes[tipo];

    if (!config) {
        return;
    }

    const editando = indice !== null;
    const registro = editando ? dados[tipo][indice] : {};

    if (editando && !registro) {
        renderizarLista(tipo);
        return;
    }

    container.innerHTML = `
        <div class="cabecalho-lista">
            <h1>
                ${editando ? 'Editar' : 'Cadastrar'}
                ${config.singular}
            </h1>
        </div>

        <form
            class="formulario-registro"
            data-formulario="${tipo}"
            data-indice="${editando ? indice : ''}">

            ${config.campos.map(campo =>
                gerarCampo(campo, registro[campo.chave] ?? '')
            ).join('')}

            <div class="acoes-formulario">
                <button
                    type="button"
                    class="botao-itens"
                    data-acao="voltar"
                    data-tipo="${tipo}">
                    Voltar
                </button>

                <button
                    type="submit"
                    class="botao-itens">
                    ${editando ? 'Salvar alterações' : 'Cadastrar'}
                </button>
            </div>
        </form>
    `;
}

// Essa função permite excluir registros e pede uma confirmação antes.

function excluirRegistro(tipo, indice) {
    const config = configuracoes[tipo];
    const registro = dados[tipo]?.[indice];

    if (!config || !registro) {
        return;
    }

    const nomeRegistro = config.nome(registro);

    if (confirm(`Tem certeza de que deseja excluir "${nomeRegistro}"?`)) {
        dados[tipo].splice(indice, 1);
        renderizarLista(tipo);
    }
}

// Permite salvar as edições feitas ou os dados de um novo cadastro.

function tratarEnvioFormulario(formulario) {
    const tipo = formulario.dataset.formulario;
    const config = configuracoes[tipo];

    if (!config) {
        return;
    }

    const indiceTexto = formulario.dataset.indice;
    const editando = indiceTexto !== '';
    const novoRegistro = {};

    // Reúne os valores de todos os campos.
    for (const campo of config.campos) {
        const entrada = formulario.elements.namedItem(campo.chave);

        novoRegistro[campo.chave] = entrada.value.trim();
    }

    // Impede nomes de trens duplicados.
    if (
        tipo === 'trens' &&
        dados.trens.some((trem, indice) =>
            trem.nome.toLowerCase() === novoRegistro.nome.toLowerCase() &&
            (!editando || indice !== Number(indiceTexto))
        )
    ) {
        alert('Já existe um trem com esse nome.');
        return;
    }

    // Impede códigos de alertas duplicados.
    if (
        tipo === 'alertas' &&
        dados.alertas.some((alerta, indice) =>
            alerta.codigo.toLowerCase() === novoRegistro.codigo.toLowerCase() &&
            (!editando || indice !== Number(indiceTexto))
        )
    ) {
        alert('Já existe um alerta com esse código.');
        return;
    }

    // Impede códigos de sensores duplicados.
    if (
        tipo === 'sensores' &&
        dados.sensores.some((sensor, indice) =>
            sensor.codigo.toLowerCase() === novoRegistro.codigo.toLowerCase() &&
            (!editando || indice !== Number(indiceTexto))
        )
    ) {
        alert('Já existe um sensor com esse código.');
        return;
    }

    // Atualiza um registro ou adiciona um novo.
    if (editando) {
        dados[tipo][Number(indiceTexto)] = novoRegistro;
    } else {
        dados[tipo].push(novoRegistro);
    }

    renderizarLista(tipo);
}

// Mantém o HTML da tela de relatórios e usuários intacta. Isso será alterado depois.

const conteudos = {
    relatorios: `
        <h1>Relatórios</h1>

        <div class="cards-relatorios">
            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M5.736 0a1.5 1.5 0 0 0-.67.158L1.828 1.776A1.5 1.5 0 0 0 1 3.118v5.51l2-.6V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.028l2 .6v-5.51a1.5 1.5 0 0 0-.83-1.342L10.936.158A1.5 1.5 0 0 0 10.264 0zM15 9.672l-5.503-1.65A.5.5 0 0 0 9.353 8H8.5v8h4a2.5 2.5 0 0 0 2.5-2.5zM7.5 16V8h-.853a.5.5 0 0 0-.144.021L1 9.672V13.5A2.5 2.5 0 0 0 3.5 16zm-1-14h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1"/>
                    </svg>
                    <h2>Trens registrados</h2>
                </div>
                <h3>67</h3>
                <p>42 ativos</p>
                <a>Ver detalhes &gt;</a>
            </div>

            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <h2>Alertas</h2>
                </div>
                <h3>25</h3>
                <p>15 ativas</p>
                <a>Ver detalhes &gt;</a>
            </div>

            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M7 16h2V6h5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.8 2.4A1 1 0 0 0 14 2H9v-.586a1 1 0 0 0-2 0V7H2a1 1 0 0 0-.8.4L.225 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4h5z"/>
                    </svg>
                    <h2>Linhas registradas</h2>
                </div>
                <h3>17</h3>
                <p>15 ativas</p>
                <a>Ver detalhes &gt;</a>
            </div>

            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                    </svg>
                    <h2>Sensores</h2>
                </div>
                <h3>32</h3>
                <p>19 ativos</p>
                <a>Ver detalhes &gt;</a>
            </div>
        </div>
    `,

    usuarios: `
        <h1>Gerenciar usuários</h1>
        <p>O conteúdo aparecerá aqui</p>
    `
};

// Gerencia a navegação pelo menu lateral do dashboard, injetando o HTML da opção selecionada no container.

document.querySelectorAll('.item-barra-nav').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.id;

        if (configuracoes[id]) {
            renderizarLista(id);
            return;
        }

        if (id === 'relatorios' || id === 'usuarios') {
            container.innerHTML = conteudos[id];
        }
    });
});

// Gerencia a navegação pelos botões presentes na tela (editar e cadastrar). Substitui o conteúdo do container pela tela para a qual o botão direciona.

container.addEventListener('click', evento => {
    const botao = evento.target.closest('[data-acao]');

    if (!botao) {
        return;
    }

    const acao = botao.dataset.acao;
    const tipo = botao.dataset.tipo;
    const indice = Number(botao.dataset.indice);

    if (acao === 'cadastrar') {
        renderizarFormulario(tipo);
    } else if (acao === 'editar') {
        renderizarFormulario(tipo, indice);
    } else if (acao === 'excluir') {
        excluirRegistro(tipo, indice);
    } else if (acao === 'voltar') {
        renderizarLista(tipo);
    }
});

// Confirma o envio dos dados dos formulários.

container.addEventListener('submit', evento => {
    const formulario = evento.target.closest('.formulario-registro');

    if (!formulario) {
        return;
    }

    evento.preventDefault();

    if (!formulario.reportValidity()) {
        return;
    }

    tratarEnvioFormulario(formulario);
});

// Renderiza a tela com base no botão clicado no menu de navegação.

const itemAtivo = document.querySelector(
    '.item-barra-nav.ativo, .item-barra-nav.active'
);

if (itemAtivo && configuracoes[itemAtivo.id]) {
    renderizarLista(itemAtivo.id);
}