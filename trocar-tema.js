let temaClaro = localStorage.getItem('temaClaro')
const trocarTema = document.getElementById('botao-switch')

const ativarTemaClaro = () =>  {
    document.body.classList.add('tema-claro')
    localStorage.setItem('temaClaro', 'ativo')
}

const desativarTemaClaro = () =>  {
    document.body.classList.remove('tema-claro')
    localStorage.setItem('temaClaro', null)
}

if(temaClaro === "ativo") ativarTemaClaro()

trocarTema.addEventListener("click", () => {
    temaClaro = localStorage.getItem('temaClaro')
    temaClaro !== "ativo" ? ativarTemaClaro() : desativarTemaClaro()
})