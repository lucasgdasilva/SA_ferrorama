const container = document.querySelector('.container-principal');

const conteudos = {

    linhas: `
        <h1>Linhas</h1>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 1</h3>
                            <p>Joinville - São Francisco do Sul</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 2</h3>
                            <p>Joinville - Corupá</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 3</h3>
                            <p>Joinville - Mafra</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 4</h3>
                            <p>Joinville - Araquari</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 5</h3>
                            <p>Joinville - Guaramirim</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 6</h3>
                            <p>Joinville - Jaraguá do Sul</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 7</h3>
                            <p>Joinville - Blumenau</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 8</h3>
                            <p>Joinville - Lages</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <h3>Linha 9</h3>
                            <p>Joinville - Barra do Sul</p>
                        </div>
                        <button class="botao-itens">
                            Ver mapa
                        </button>
                    </div>
    `,

    trens: `
        <h1>Trens</h1>
                    <div class="item">
                        <div class="informacoes-item">
                            <div class="trem">
                                <h3>TP-001</h3>
                                <p class="status-ok">Em operação</p>
                            </div>
                            <p>item 2 (Joinville - Corupá)</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <div class="trem">
                                <h3>TC-001</h3>
                                <p class="status-ok">Em operação</p>
                            </div>
                            <p>item 3 (Joinville - Mafra)</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <div class="trem">
                                <h3>TP-002</h3>
                                <p class="status-manutencao">Em manutenção</p>
                            </div>
                            <p>item 1 (Joinville - São Francisco do Sul)</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <div class="trem">
                                <h3>TP-003</h3>
                                <p class="status-parado">Parado</p>
                            </div>
                            <p>item 1 (Joinville - São Francisco do Sul)</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <div class="trem">
                                <h3>TC-002</h3>
                                <p class="status-ok">Em operação</p>
                            </div>
                            <p>item 5 (Joinville - Guaramirim)</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <div class="trem">
                                <h3>TC-003</h3>
                                <p class="status-manutencao">Em manutenção</p>
                            </div>
                            <p>item 4 (Joinville - Araquari)</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-item">
                            <div class="trem">
                                <h3>TC-004</h3>
                                <p class="status-parado">Parado</p>
                            </div>
                            <p>item 6 (Joinville - Jaraguá do Sul)</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
    `,

    alertas: `
        <h1>Alertas</h1>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>A-058</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Obstrução da linha - Linha 2</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>A-059</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Chuva intensa - Linha 3</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>A-060</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Erro no GPS/localização - Linha 4</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>A-061</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Superlotação - Linha 5</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>A-062</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Trem danificado - Linha 6</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>A-063</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Trilho danificado - Linha 7</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>A-064</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Obstrução na linha - Linha 8</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
    `,

    sensores: `
        <h1>Sensores</h1>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>VEL-032</h3>
                                <p class="status-ok">OK</p>
                            </div>
                            <p>Sensor de velocidade</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>PROX-068</h3>
                                <p class="status-ok">OK</p>
                            </div>
                            <p>Sensor de proximidade</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>UMD-027</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Sensor de umidade</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>VEL-035</h3>
                                <p class="status-ok">OK</p>
                            </div>
                            <p>Sensor de velocidade</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>PROX-071</h3>
                                <p class="status-parado" id="alerta">!</p>
                            </div>
                            <p>Sensor de proximidade</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>UMD-030</h3>
                                <p class="status-ok">OK</p>
                            </div>
                            <p>Sensor de umidade</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
                    <div class="item">
                        <div class="informacoes-linha">
                            <div class="trem">
                                <h3>VEL-038</h3>
                                <p class="status-ok">OK</p>
                            </div>
                            <p>Sensor de velocidade</p>
                        </div>
                        <button class="botao-itens">
                            Detalhes
                        </button>
                    </div>
    `,

    relatorios: `
     <h1>Relatórios</h1>
                <div class="cards-relatorios">
                    <div class="card">
                        <div class="titulo">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-train-freight-front-fill" viewBox="0 0 16 16"><path d="M5.736 0a1.5 1.5 0 0 0-.67.158L1.828 1.776A1.5 1.5 0 0 0 1 3.118v5.51l2-.6V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.028l2 .6v-5.51a1.5 1.5 0 0 0-.83-1.342L10.936.158A1.5 1.5 0 0 0 10.264 0zM15 9.672l-5.503-1.65A.5.5 0 0 0 9.353 8H8.5v8h4a2.5 2.5 0 0 0 2.5-2.5zM7.5 16V8h-.853a.5.5 0 0 0-.144.021L1 9.672V13.5A2.5 2.5 0 0 0 3.5 16zm-1-14h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1M12 5v2.728l-2.216-.665A1.5 1.5 0 0 0 9.354 7H8.5V5zM7.5 5v2h-.853a1.5 1.5 0 0 0-.431.063L4 7.728V5zm-4 5a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m9 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/></svg>
                            <h2>Trens registrados</h2>
                        </div>
                        <h3>67</h3>
                        <p>42 ativos</p>
                        <a>Ver detalhes ></a>
                    </div>
                    <div class="card">
                        <div class="titulo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                                <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            <h2>Alertas</h2>
                        </div>
                        <h3>25</h3>
                        <p>15 ativas</p>
                        <a>Ver detalhes ></a>
                    </div>
                    <div class="card">
                        <div class="titulo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-signpost-split-fill" viewBox="0 0 16 16">
                                <path d="M7 16h2V6h5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.8 2.4A1 1 0 0 0 14 2H9v-.586a1 1 0 0 0-2 0V7H2a1 1 0 0 0-.8.4L.225 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4h5z"/>
                            </svg>
                            <h2>Linhas registradas</h2>
                        </div>
                        <h3>17</h3>
                        <p>15 ativas</p>
                        <a>Ver detalhes ></a>
                    </div>
                    <div class="card">
                        <div class="titulo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-broadcast" viewBox="0 0 16 16">
                                <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                            </svg>
                            <h2>Sensores</h2>
                        </div>
                        <h3>32</h3>
                        <p>19 ativos</p>
                        <a>Ver detalhes ></a>
                    </div>
    `,

    usuarios: `
        <h1>Gerenciar usuários</h1>
        <p>O conteúdo aparecerá aqui</p>
    `
};

document.querySelectorAll('.item-barra-nav').forEach(item => {

    item.addEventListener('click', () => {

        const id = item.id;

        container.innerHTML = conteudos[id];

    });

});
