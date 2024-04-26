const mainVideos = document.querySelector('.videos__container')
const searchVideos = document.querySelector('.pesquisar__input')
const btnCategorias = document.querySelectorAll('.superior__item')
const videos = document.querySelectorAll('.videos__item')

async function consomeApi() {
    try {
        const api = await fetch('http://localhost:3000/videos')
        const videos = await api.json()
        
        videos.forEach(video => {
            if (video.categoria === '') {
                throw new Error('Vídeo')
            }
            mainVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="./img/sidebar/Avatar_Alura.png" alt="Ícone Alura">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `
        })
    } catch(error) {
        searchVideos.innerHTML = `
            <p>Houve um erro ao carregar os vídeos: ${error}</p>
        `
    } finally {
        console.log('Tentativa de carregar vídeos finalizada.')
    }
}

consomeApi()

searchVideos.addEventListener('input', filtraPesquisa)

function filtraPesquisa() {    
    let busca = searchVideos.value.toLowerCase()

    videos.forEach(video => {
        let titulo = video.querySelector('.titulo-video').textContent.toLowerCase()
        video.style.display = titulo.includes(busca) ? 'block' : 'none'
    })
}

btnCategorias.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name')
    botao.addEventListener('click', () => filtraPorCategoria(nomeCategoria))
})

function filtraPorCategoria(filtro) {    
    for (let video of videos) {
        let valorFiltro = filtro.toLowerCase()
        let categoria = video.querySelector('.categoria').textContent.toLowerCase()

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = 'none'
        } else {
            video.style.display = 'block'
        }
    }
    // videos.forEach(video => {
    //     let categoria = video.querySelector('.categoria').textContent.toLowerCase()

    //     if (!categoria.includes(filtro)) {
    //         video.style.display = 'none'
    //     } else {
    //         video.style.display = 'block'
    //     }
    // })
}
