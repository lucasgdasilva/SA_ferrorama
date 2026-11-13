// Esse código pode ser bem complicado de entender. Vou deixar aqui comentários para auxiliar.
// - Lucas

// Esse JavaScript é responsável por gerar dinamicamente o que será visto no dashboard. Aqui a gente armazena os dados e o HTML que aparecerá
// no container principal. O JavaScript injeta o HTML dentro do container pra fazer ele aparecer na tela, e mudar quando outra tela é selecionada
// no menu de navegação lateral. Esse código também gerencia os formulários do CRUD, que permite criar, apagar, editar e exibir na tela os registros
// de cada tela.


const container = document.querySelector('.container-principal');

const endpointsAPI = {
    linhas: 'api/linhas.php',
    trens: 'api/trens.php',
    sensores: 'api/sensores.php',
    alertas: 'api/alertas.php',
    usuarios: 'api/usuarios.php'
};

const tiposAPI = Object.keys(endpointsAPI);

// Aqui se encontram os arrays que armazenam os dados da API. Eles permanecem vazios por padrão. O PHP busca e adiciona
// os registros dentro deles.
const dados = {
    trens: [],
    linhas: [],
    alertas: [],
    sensores: [],
    usuarios: []
};

const configuracoes = {
    trens: {
        titulo: 'Trens',
        singular: 'trem',
        campos: [
            { chave: 'nome', rotulo: 'Nome do trem', tipo: 'text', obrigatorio: true },
            { chave: 'status', rotulo: 'Status', tipo: 'select', opcoes: ['Em operação', 'Em manutenção', 'Parado'], obrigatorio: true },
            { chave: 'linha', rotulo: 'Linha', tipo: 'select', opcoes: () => dados.linhas.map(linha => linha.nome), obrigatorio: true },
            { chave: 'modelo', rotulo: 'Modelo do trem', tipo: 'text', obrigatorio: true },
            { chave: 'tipo', rotulo: 'Tipo de trem', tipo: 'select', opcoes: ['Carga', 'Passageiros'], obrigatorio: true }
        ],
        nome: item => item.nome,
        descricao: item => `${item.linha} · ${item.tipo} · ${item.modelo}`,
        status: item => item.status
    },
    linhas: {
        titulo: 'Linhas',
        singular: 'linha',
        campos: [
            { chave: 'nome', rotulo: 'Nome da linha', tipo: 'text', obrigatorio: true },
            { chave: 'origem', rotulo: 'Cidade de origem', tipo: 'text', obrigatorio: true },
            { chave: 'destino', rotulo: 'Cidade de destino', tipo: 'text', obrigatorio: true },
            { chave: 'status', rotulo: 'Status', tipo: 'select', opcoes: ['Ativa', 'Inativa', 'Em manutenção'], obrigatorio: true }
        ],
        nome: item => item.nome,
        descricao: item => `${item.origem} - ${item.destino}`,
        status: item => item.status
    },
    alertas: {
        titulo: 'Alertas',
        singular: 'alerta',
        campos: [
            { chave: 'codigo', rotulo: 'Código do alerta', tipo: 'text', obrigatorio: true },
            { chave: 'descricao', rotulo: 'Descrição', tipo: 'text', obrigatorio: true },
            { chave: 'linha', rotulo: 'Linha relacionada', tipo: 'select', opcoes: () => dados.linhas.map(linha => linha.nome), obrigatorio: true },
            { chave: 'status', rotulo: 'Status', tipo: 'select', opcoes: ['Ativo', 'Resolvido'], obrigatorio: true },
            { chave: 'gravidade', rotulo: 'Gravidade', tipo: 'select', opcoes: ['Baixa', 'Média', 'Alta'], obrigatorio: true }
        ],
        nome: item => item.codigo,
        descricao: item => `${item.descricao} - ${item.linha} · Gravidade: ${item.gravidade}`,
        status: item => item.status
    },
    sensores: {
        titulo: 'Sensores',
        singular: 'sensor',
        campos: [
            { chave: 'codigo', rotulo: 'Código do sensor', tipo: 'text', obrigatorio: true },
            { chave: 'tipo', rotulo: 'Tipo de sensor', tipo: 'select', opcoes: ['Sensor de velocidade', 'Sensor de proximidade', 'Sensor de umidade', 'Sensor de temperatura', 'Sensor de falha'], obrigatorio: true },
            { chave: 'status', rotulo: 'Status', tipo: 'select', opcoes: ['OK', 'Falha', 'Em manutenção'], obrigatorio: true },
            { chave: 'linha', rotulo: 'Linha', tipo: 'select', opcoes: () => dados.linhas.map(linha => linha.nome), obrigatorio: true }
        ],
        nome: item => item.codigo,
        descricao: item => `${item.tipo} · ${item.linha}`,
        status: item => item.status
    }
};

async function requisitarAPI(tipo, metodo = 'GET', dadosRequisicao = null) {
    if (!endpointsAPI[tipo]) {
        throw new Error('Categoria inválida.');
    }

    const opcoes = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (dadosRequisicao !== null) {
        opcoes.body = JSON.stringify(dadosRequisicao);
    }

    const resposta = await fetch(endpointsAPI[tipo], opcoes);

    let resultado;

    try {
        resultado = await resposta.json();
    } catch {
        throw new Error('O servidor retornou uma resposta inválida.');
    }

    if (!resposta.ok) {
        throw new Error(
            resultado.erro || 'Não foi possível realizar a operação.'
        );
    }

    return resultado;
}

async function carregarDadosAPI(tipo) {
    try {
        dados[tipo] = await requisitarAPI(tipo);
        return true;
    } catch (erro) {
        alert(erro.message);
        return false;
    }
}

function escaparHTML(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[caractere]);
}

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

    if (valor.includes('manutenção') || valor === 'média') {
        return 'status-manutencao';
    }

    return 'status-parado';
}

async function renderizarLista(tipo) {
    const config = configuracoes[tipo];
    if (!config) return;

    if (tipo === 'linhas') {
        const carregou = await carregarDadosAPI('linhas');
        if (!carregou) return;
    }

    if (['trens', 'sensores', 'alertas'].includes(tipo)) {
        const linhasCarregadas = await carregarDadosAPI('linhas');
        if (!linhasCarregadas) return;

        const dadosCarregados = await carregarDadosAPI(tipo);
        if (!dadosCarregados) return;
    }

    const itens = dados[tipo];

    const conteudoItens = itens.length
        ? itens.map(item => {
            const identificador = item.id;

            return `
                <div class="item">
                    <div class="informacoes-item">
                        <div class="trem">
                            <h3>${escaparHTML(config.nome(item))}</h3>
                            <p class="${classeStatus(config.status(item))}">${escaparHTML(config.status(item))}</p>
                        </div>
                        <p>${escaparHTML(config.descricao(item))}</p>
                    </div>
                    <div class="acoes-item">
                        <button type="button" class="botao-itens" data-acao="editar" data-tipo="${tipo}" data-indice="${identificador}">Editar</button>
                        <button type="button" class="botao-itens botao-excluir" data-acao="excluir" data-tipo="${tipo}" data-indice="${identificador}">Excluir</button>
                    </div>
                </div>
            `;
        }).join('')
        : '<p>Nenhum registro cadastrado.</p>';

    container.innerHTML = `
        <div class="cabecalho-lista">
            <h1>${config.titulo}</h1>
            <button type="button" class="botao-itens" data-acao="cadastrar" data-tipo="${tipo}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg> Cadastrar ${config.singular}</button>
        </div>
        <div class="lista-registros">${conteudoItens}</div>
    `;
}

function gerarCampo(campo, valorAtual = '') {
    const obrigatorio = campo.obrigatorio ? 'required' : '';

    if (campo.tipo === 'select') {
        const opcoes = typeof campo.opcoes === 'function'
            ? campo.opcoes()
            : campo.opcoes;

        return `
            <label class="campo-formulario">
                <span>${escaparHTML(campo.rotulo)}</span>
                <select name="${escaparHTML(campo.chave)}" ${obrigatorio}>
                    <option value="">Selecione...</option>
                    ${opcoes.map(opcao => `
                        <option value="${escaparHTML(opcao)}" ${opcao === valorAtual ? 'selected' : ''}>${escaparHTML(opcao)}</option>
                    `).join('')}
                </select>
            </label>
        `;
    }

    return `
        <label class="campo-formulario">
            <span>${escaparHTML(campo.rotulo)}</span>
            <input type="text" name="${escaparHTML(campo.chave)}" value="${escaparHTML(valorAtual)}" ${obrigatorio}>
        </label>
    `;
}

function renderizarFormulario(tipo, indice = null) {
    const config = configuracoes[tipo];
    if (!config) return;

    const editando = indice !== null;

    const registro = !editando
        ? {}
        : dados[tipo].find(item => String(item.id) === String(indice));

    if (editando && !registro) {
        renderizarLista(tipo);
        return;
    }

    container.innerHTML = `
        <div class="cabecalho-lista">
            <h1>${editando ? 'Editar' : 'Cadastrar'} ${config.singular}</h1>
        </div>
        <form class="formulario-registro" data-formulario="${tipo}" data-indice="${editando ? registro.id : ''}">
            ${config.campos.map(campo => gerarCampo(campo, registro[campo.chave] ?? '')).join('')}
            <div class="acoes-formulario">
                <button type="button" class="botao-itens" data-acao="voltar" data-tipo="${tipo}">Voltar</button>
                <button type="submit" class="botao-itens">${editando ? 'Salvar alterações' : 'Cadastrar'}</button>
            </div>
        </form>
    `;
}

async function excluirRegistro(tipo, indice) {
    const config = configuracoes[tipo];

    const registro = dados[tipo]?.find(
        item => String(item.id) === String(indice)
    );

    if (!config || !registro) return;

    if (!confirm(`Tem certeza de que deseja excluir "${config.nome(registro)}"?`)) {
        return;
    }

    try {
        await requisitarAPI(tipo, 'DELETE', {
            id: registro.id
        });

        await renderizarLista(tipo);
    } catch (erro) {
        alert(erro.message);
    }
}

async function tratarEnvioFormulario(formulario) {
    const tipo = formulario.dataset.formulario;
    const config = configuracoes[tipo];
    if (!config) return;

    const indiceTexto = formulario.dataset.indice;
    const editando = indiceTexto !== '';
    const novoRegistro = {};

    for (const campo of config.campos) {
        const entrada = formulario.elements.namedItem(campo.chave);
        novoRegistro[campo.chave] = entrada.value.trim();
    }

    try {
        if (editando) {
            novoRegistro.id = Number(indiceTexto);
            await requisitarAPI(tipo, 'PUT', novoRegistro);
        } else {
            await requisitarAPI(tipo, 'POST', novoRegistro);
        }

        await renderizarLista(tipo);
    } catch (erro) {
        alert(erro.message);
    }
}

async function renderizarUsuarios() {
    container.innerHTML = `
        <div class="cabecalho-lista">
            <h1>Gerenciar usuários</h1>
        </div>
        <div class="lista-registros"><p>Carregando usuários...</p></div>
    `;

    try {
        dados.usuarios = await requisitarAPI('usuarios');

        const conteudoUsuarios = dados.usuarios.length
            ? dados.usuarios.map(usuario => `
                <div class="item">
                    <div class="informacoes-item">
                        <div class="trem">
                            <h3>${escaparHTML(usuario.nome)}</h3>
                            <p>${escaparHTML(usuario.cargo)}</p>
                        </div>
                        <p>${escaparHTML(usuario.email)}</p>
                        <p>Cadastro: ${escaparHTML(usuario.criado_em)}</p>
                    </div>
                    <div class="acoes-item">
                        <label class="campo-formulario">
                            <span>Permissão</span>
                            <select data-cargo-usuario="${Number(usuario.id)}">
                                <option value="Operador" ${usuario.cargo.toLowerCase() === 'operador' ? 'selected' : ''}>Operador</option>
                                <option value="Administrador" ${usuario.cargo.toLowerCase() === 'administrador' ? 'selected' : ''}>Administrador</option>
                            </select>
                        </label>
                        <button type="button" class="botao-itens" data-acao="salvar-cargo" data-indice="${Number(usuario.id)}">Salvar</button>
                    </div>
                </div>
            `).join('')
            : '<p>Nenhum usuário cadastrado.</p>';

        container.innerHTML = `
            <div class="cabecalho-lista">
                <h1>Gerenciar usuários</h1>
            </div>
            <div class="lista-registros">${conteudoUsuarios}</div>
        `;
    } catch (erro) {
        container.innerHTML = `
            <div class="cabecalho-lista">
                <h1>Gerenciar usuários</h1>
            </div>
            <p>${escaparHTML(erro.message)}</p>
        `;
    }
}

async function salvarCargoUsuario(indice) {
    const seletor = container.querySelector(`[data-cargo-usuario="${indice}"]`);
    if (!seletor) return;

    try {
        await requisitarAPI('usuarios', 'PUT', {
            id: Number(indice),
            cargo: seletor.value
        });

        alert('Permissão do usuário atualizada com sucesso.');
        await renderizarUsuarios();
    } catch (erro) {
        alert(erro.message);
    }
}


async function renderizarRelatorios() {
    container.innerHTML = conteudos.relatorios;

    const tipos = ['trens', 'alertas', 'linhas', 'sensores'];

    for (const tipo of tipos) {
        const carregou = await carregarDadosAPI(tipo);

        if (!carregou) {
            return;
        }
    }

    const statusAtivos = {
        trens: 'Em operação',
        alertas: 'Ativo',
        linhas: 'Ativa',
        sensores: 'OK'
    };

    tipos.forEach(tipo => {
        const total = dados[tipo].length;

        const ativos = dados[tipo].filter(item =>
            item.status === statusAtivos[tipo]
        ).length;

        container.querySelector(`[data-total="${tipo}"]`).textContent = total;
        container.querySelector(`[data-ativos="${tipo}"]`).textContent = ativos;
    });
}

function agruparDadosRelatorio(tipo) {
    let categorias = [];

    if (tipo === 'trens') {
        categorias = ['Em operação', 'Em manutenção', 'Parado'];
    } else if (tipo === 'linhas') {
        categorias = ['Ativa', 'Inativa', 'Em manutenção'];
    } else if (tipo === 'alertas') {
        categorias = ['Alta', 'Média', 'Baixa'];
    }

    let registros = dados[tipo];

    if (tipo === 'alertas') {
        registros = registros.filter(item => item.status === 'Ativo');
    }

    const campo = tipo === 'alertas' ? 'gravidade' : 'status';

    return categorias.map(categoria => ({
        categoria,
        itens: registros.filter(item => item[campo] === categoria)
    }));
}

function renderizarGraficoRelatorio(grupos) {
    const maiorQuantidade = Math.max(
        ...grupos.map(grupo => grupo.itens.length),
        1
    );

    return `
        <div class="grafico-relatorio">
            <h2>Distribuição por categoria</h2>

            ${grupos.map(grupo => {
                const quantidade = grupo.itens.length;
                const porcentagem = (quantidade / maiorQuantidade) * 100;

                let classe = classeStatus(grupo.categoria);

                return `
                    <div class="item-grafico">
                        <div class="informacoes-grafico">
                            <span>${escaparHTML(grupo.categoria)}</span>
                            <strong>${quantidade}</strong>
                        </div>

                        <div class="barra-grafico">
                            <div
                                class="barra-preenchimento ${classe}"
                                style="width: ${porcentagem}%"
                            ></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderizarTabelaRelatorio(tipo, grupos) {
    const configuracoesTabela = {
        trens: {
            titulo: 'Trens',
            colunas: ['Nome', 'Linha', 'Modelo', 'Tipo'],
            valores: item => [
                item.nome,
                item.linha,
                item.modelo,
                item.tipo
            ]
        },

        linhas: {
            titulo: 'Linhas',
            colunas: ['Nome', 'Origem', 'Destino'],
            valores: item => [
                item.nome,
                item.origem,
                item.destino
            ]
        },

        alertas: {
            titulo: 'Alertas ativos',
            colunas: ['Código', 'Descrição', 'Linha'],
            valores: item => [
                item.codigo,
                item.descricao,
                item.linha
            ]
        }
    };

    const config = configuracoesTabela[tipo];

    return `
        <div class="tabelas-relatorio">
            ${grupos.map(grupo => `
                <section class="grupo-relatorio">
                    <h3>
                        ${escaparHTML(grupo.categoria)}
                        <span>(${grupo.itens.length})</span>
                    </h3>

                    ${grupo.itens.length ? `
                        <div class="tabela-responsiva">
                            <table class="tabela-relatorio">
                                <thead>
                                    <tr>
                                        ${config.colunas.map(coluna =>
                                            `<th>${coluna}</th>`
                                        ).join('')}
                                    </tr>
                                </thead>

                                <tbody>
                                    ${grupo.itens.map(item => `
                                        <tr>
                                            ${config.valores(item).map(valor =>
                                                `<td>${escaparHTML(valor)}</td>`
                                            ).join('')}
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : `
                        <p class="sem-registros">
                            Nenhum registro nesta categoria.
                        </p>
                    `}
                </section>
            `).join('')}
        </div>
    `;
}

function exportarRelatorioCSV(tipo) {
    const grupos = container.querySelectorAll('.grupo-relatorio');
    const linhasCSV = [];
    let quantidadeRegistros = 0;

    grupos.forEach(grupo => {
        const titulo = grupo.querySelector('h3')?.innerText.trim();
        const tabela = grupo.querySelector('.tabela-relatorio');

        if (!tabela) return;

        linhasCSV.push(`"${titulo.replace(/"/g, '""')}"`);

        tabela.querySelectorAll('tr').forEach(linha => {
            const valores = Array.from(
                linha.querySelectorAll('th, td')
            ).map(celula =>
                `"${celula.innerText.trim().replace(/"/g, '""')}"`
            );

            if (linha.querySelector('td')) {
                quantidadeRegistros++;
            }

            linhasCSV.push(valores.join(';'));
        });

        linhasCSV.push('');
    });

    if (quantidadeRegistros === 0) {
        alert('Não há dados para exportar.');
        return;
    }

    const arquivo = new Blob(
        ['\uFEFF' + linhasCSV.join('\r\n')],
        { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement('a');

    link.href = url;
    link.download = `relatorio-${tipo}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

async function renderizarRelatorioDetalhado(tipo) {
    const titulos = {
        trens: 'Relatório de Trens',
        alertas: 'Relatório de Alertas',
        linhas: 'Relatório de Linhas'
    };

    if (!titulos[tipo]) return;

    try {
        dados[tipo] = await requisitarAPI(tipo);
    } catch (erro) {
        alert(erro.message);
        return;
    }

    const grupos = agruparDadosRelatorio(tipo);

    container.innerHTML = `
        <div class="cabecalho-relatorio">
            <h1>${titulos[tipo]}</h1>

            <button
                type="button"
                class="botao-exportar"
                data-acao="exportar-csv"
                data-tipo="${tipo}"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0"/></svg>
                Exportar CSV
            </button>
        </div>

        ${renderizarGraficoRelatorio(grupos)}

        ${renderizarTabelaRelatorio(tipo, grupos)}

        <div class="rodape-relatorio">
            <button
                class="botao-itens"
                data-acao="voltar-relatorios"
            >
                Voltar
            </button>
        </div>
    `;
}

const conteudos = {
    relatorios: `
        <h1>Relatórios</h1>
        <div class="cards-relatorios">
            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-train-freight-front-fill" viewBox="0 0 16 16"><path d="M5.736 0a1.5 1.5 0 0 0-.67.158L1.828 1.776A1.5 1.5 0 0 0 1 3.118v5.51l2-.6V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.028l2 .6v-5.51a1.5 1.5 0 0 0-.83-1.342L10.936.158A1.5 1.5 0 0 0 10.264 0zM15 9.672l-5.503-1.65A.5.5 0 0 0 9.353 8H8.5v8h4a2.5 2.5 0 0 0 2.5-2.5zM7.5 16V8h-.853a.5.5 0 0 0-.144.021L1 9.672V13.5A2.5 2.5 0 0 0 3.5 16zm-1-14h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1M12 5v2.728l-2.216-.665A1.5 1.5 0 0 0 9.354 7H8.5V5zM7.5 5v2h-.853a1.5 1.5 0 0 0-.431.063L4 7.728V5zm-4 5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m9 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/></svg>
                    <h2>Trens registrados</h2>
                </div>
                <h3 data-total="trens">0</h3>
                <p><span data-ativos="trens">0</span> ativos</p>
                <a href="#" data-acao="ver-relatorio" data-tipo="trens">Ver detalhes &gt;</a>
            </div>
            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <h2>Alertas</h2>
                </div>
                <h3 data-total="alertas">0</h3>
                <p><span data-ativos="alertas">0</span> ativos</p>
                <a href="#" data-acao="ver-relatorio" data-tipo="alertas">Ver detalhes &gt;</a>
            </div>
            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-signpost-split-fill" viewBox="0 0 16 16">
                        <path d="M7 16h2V6h5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.8 2.4A1 1 0 0 0 14 2H9v-.586a1 1 0 0 0-2 0V7H2a1 1 0 0 0-.8.4L.225 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4h5z"/>
                    </svg>
                    <h2>Linhas registradas</h2>
                </div>
                <h3 data-total="linhas">0</h3>
                <p><span data-ativos="linhas">0</span> ativas</p>
                <a href="#" data-acao="ver-relatorio" data-tipo="linhas">Ver detalhes &gt;</a>
            </div>
            <div class="card">
                <div class="titulo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-broadcast" viewBox="0 0 16 16">
                        <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 5 5 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                    </svg>
                    <h2>Sensores</h2>
                </div>
                <h3 data-total="sensores">0</h3>
                <p><span data-ativos="sensores">0</span> ativos</p>
                <a>Ver detalhes ></a>
            </div>
        </div>
    `
};

async function verificarAcessoUsuarios() {
    const itemUsuarios = document.querySelector('#usuarios');

    if (!itemUsuarios) return;

    itemUsuarios.hidden = true;

    try {
        const resposta = await fetch('api/usuarios.php?verificar=1');

        if (resposta.ok) {
            itemUsuarios.hidden = false;
        }
    } catch {
        itemUsuarios.hidden = true;
    }
}

verificarAcessoUsuarios();

// Navegação principal do dashboard.
document.querySelectorAll('.item-barra-nav').forEach(item => {
    item.addEventListener('click', () => {
        const id = item.id;

        if (configuracoes[id]) {
            renderizarLista(id);
            return;
        }

        if (id === 'relatorios') {
            renderizarRelatorios();
            return;
        }

        if (id === 'usuarios') {
            renderizarUsuarios();
        }
    });
});

// Delegação de eventos: funciona também nos botões e formulários criados dinamicamente.
container.addEventListener('click', evento => {
    const botao = evento.target.closest('[data-acao]');
    if (!botao) return;

    const acao = botao.dataset.acao;
    const tipo = botao.dataset.tipo;
    const indice = botao.dataset.indice;

    if (acao === 'cadastrar') {
        renderizarFormulario(tipo);
    } else if (acao === 'editar') {
        renderizarFormulario(tipo, indice);
    } else if (acao === 'excluir') {
        excluirRegistro(tipo, indice);
    } else if (acao === 'voltar') {
        renderizarLista(tipo);
    } else if (acao === 'ver-relatorio') {
        evento.preventDefault();
        renderizarRelatorioDetalhado(tipo);
    }  else if (acao === 'exportar-csv') {
        exportarRelatorioCSV(tipo);
    } else if (acao === 'voltar-relatorios') {
        renderizarRelatorios();
    } else if (acao === 'salvar-cargo') {
        salvarCargoUsuario(indice);
    }
});

container.addEventListener('submit', evento => {
    const formulario = evento.target.closest('.formulario-registro');
    if (!formulario) return;

    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    tratarEnvioFormulario(formulario);
});

// Exibe uma tela inicial se houver um item de navegação marcado como ativo.
const itemAtivo = document.querySelector('.item-barra-nav.ativo, .item-barra-nav.active');

if (itemAtivo && configuracoes[itemAtivo.id]) {
    renderizarLista(itemAtivo.id);
}
