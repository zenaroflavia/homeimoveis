const imoveis = buscarTodosImoveis()

if(window,localStorage.getItem("lista")==null){
    //salva a lista original no local storage
    window.localStorage.setItem("lista",JSON.stringify(imoveis))
}else{
    //recupera a lista com os items que foram marcados como favoritos
    imoveis = JSON.parse(window.localStorage.getItem("lista"))
}


function criarImovelHTML(imovel) {
    const section = document.createElement("section")
    section.setAttribute("class", "listing")

    // cria o elemento no html
    const img = document.createElement("img")
    img.setAttribute("class", "listing-photo")
    img.setAttribute("src", imovel.url_foto)

    section.appendChild(img)

    const h2 = document.createElement("h2")
    h2.setAttribute("class", "listing-heading")
    h2.textContent = imovel.nome

    section.appendChild(h2)

    //criar tag <p>
    const p = document.createElement("p")
    p.setAttribute("class", "listing-location")
    p.textContent = imovel.cidade + " - " + imovel.estado

    section.appendChild(p)

    // a
    const a = document.createElement("a")
    a.textContent = "Veja mais"

    const url = `detalhes.html?imovelId=${imovel.id}`
    a.setAttribute("href", url)

    section.appendChild(a)


    const favId = `fav-${imovel.id}`
    const favorito = document.createElement("img")
    favorito.setAttribute("id", favId)

    if(imovel.favorito == true){
        favorito.setAttribute("src", "img/favorito.png")
    }else if(imovel.favorito == false){
        favorito.setAttribute("src", "img/naofavorito.png")
    }
 
    
    favorito.setAttribute("class", "favorito")
    favorito.setAttribute("onclick", `favoritar(${JSON.stringify(imovel)})`)  //converte para string 

    section.appendChild(favorito)


    // section pai
    const sectionResults = document.getElementById("lista-imoveis")
    sectionResults.appendChild(section) // adicionar tag
}


function filtrar() {
    const pesquisa = document.getElementById("pesquisa").value
    //alert("pesquisando " + pesquisa)
    listarImoveisComFiltro(pesquisa)
}

function favoritar(imovel) {
    const favId = `fav-${imovel.id}`
    const fav = document.getElementById(favId)
    const posicaoLista = imovel.id-1

    //fav.setAttribute("src","img/favorito.png")

    if (fav.getAttribute("src") == "img/favorito.png") {
        fav.setAttribute("src", "img/naofavorito.png")
        imoveis[posicaoLista].favorito = false
    } else {
        fav.setAttribute("src", "img/favorito.png")
        imoveisfavoritos.push(imovel)

    }

    window.localStorage.setItem("lista",JSON.stringify(imoveisfavoritos)) //pega um lista e passa pra string
}

function mostrarFavoritos(){
    limparListaImoveis()

    //imoveisfavoritos = JSON.parse(window.localStorage.getItem("lista")) // volta de string para lista
    for(let i=0;i< imoveis.length;i++){
        const imovel = imoveis[i]

        if (imovel.favorito == true){
            criarImovelHTML(imovel)
        }
    }
}


// filtrar por tipo de imovel checkbox apartamento 
function filtrartipo1() {
    limparListaImoveis()
    const check1 = document.getElementById("ap").checked

    alert("selecionou " + check1)
   

    if (check1 == true) {
        for(let i=0;i< imoveis.length;i++){
            const imovel = imoveis[i]
            
            if(imovel.tipo == "apartamento"){
                criarImovelHTML(imovel)
            }
            
        }
    }else{
        mostrarTodosOsImoveis()
    }

}

// filtrar por tipo de imovel checkbox apartamento 
function filtrartipo2() {
    const check1 = document.getElementById("casa").checked

    alert("selecionou " + check1)
    limparListaImoveis()

    if (check1 == true) {
        for(let i=0;i< imoveis.length;i++){
            const imovel = imoveis[i]
            
            if(imovel.tipo == "casa"){
                criarImovelHTML(imovel)
            }
            
        }
    }else{
        mostrarTodosOsImoveis()
    }

}

function listarImoveisComFiltro(texto) {

    limparListaImoveis()

    if (texto == "") {
        mostrarTodosOsImoveis()
    } else {
        for (let i = 0; i < imoveis.length; i++) {
            const imovel = imoveis[i]

            const textoM = removerAcentos(texto.toUpperCase())
            const cidadeImovelM = removerAcentos(imovel.cidade.toUpperCase())
            const estadoImovelM = removerAcentos(imovel.estado.toUpperCase())

            if (cidadeImovelM.search(textoM) == 0 || estadoImovelM.search(textoM) == 0) {  // igual a 0 porque contem parte do texto que está pesquisando
                //aparecer na página
                criarImovelHTML(imovel)
            }
        }
    }
}


function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filtrarComEnter(tecla) {
    if (tecla.keyCode == 13) {
        tecla.preventDefault()  // breca o carregamento
        filtrar()
    }

}

function mostrarTodosOsImoveis() {
    limparListaImoveis()
    for (let i = 0; i < imoveis.length; i++) {
        const imovel = imoveis[i]
        criarImovelHTML(imovel)
    }

}

//limpar lista de imoveis
function limparListaImoveis() {
    const sectionResults = document.getElementById("lista-imoveis")
    while (sectionResults.lastElementChild) {// enquanto exister um item no sectionresults
        sectionResults.removeChild(sectionResults.lastElementChild)
    }

}

//cria dinamicamente
mostrarTodosOsImoveis()

