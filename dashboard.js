const container = document.querySelector('.container-principal');

const conteudos = {

    linhas: `
        <h1>Gerenciar linhas</h1>
        <p>O conteúdo aparecerá aqui</p>
    `,

    trens: `
        <h1>Gerenciar trens</h1>
        <p>O conteúdo aparecerá aqui</p>
    `,

    alertas: `
        <h1>Alertas</h1>
        <p>O conteúdo aparecerá aqui</p>
    `,

    sensores: `
        <h1>Sensores</h1>
        <p>O conteúdo aparecerá aqui</p>
    `,

    relatorios: `
        <h1>Relatórios</h1>
       <p>O conteúdo aparecerá aqui</p>
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