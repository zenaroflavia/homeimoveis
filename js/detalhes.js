
function buscarImovel() {
    const urlPagina = window.location.href
    const id = urlPagina.split("=")[1]
    const imvDetalhe = buscaImovelPeloId(id)
    atualizarImovel(imvDetalhe)
}

function atualizarImovel(imovel) {
    const imgImv = document.getElementById("img")
    imgImv.setAttribute("src", imovel.url_foto)

    const nrcasa = document.getElementById("ncasa")
    nrcasa.textContent = imovel.nome

    const localp = document.getElementById("local")
    //localp.textContent = imovel.cidade + " - " + imovel.estado
    localp.textContent = `${imovel.cidade} - ${imovel.estado}`

    const adicionais = imovel.adicionais
    const ul = document.getElementById("lista-adicionais")

    if(adicionais.length == 0){
        const li = document.createElement("li")
        li.textContent="Sem adicionais para o imóvel"
        ul.appendChild(li)
    }else{
        for (let i = 0; i < adicionais.length; i++) {
            const adicional = adicionais[i]
            const chave = adicional.chave
            const valor = adicional.valor
    
            const li = document.createElement("li")
            li.textContent = `${chave}: ${valor}`
            ul.appendChild(li)
    
        }

    }




}
