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
