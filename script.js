const videosContainer = document.querySelector('.videos__container')
const searchVideos = document.querySelector('.pesquisar__input')
const categoriaVideos = document.querySelectorAll('.superior__item')

async function consomeApi() {
    const api = await fetch('https://alura-api-videos-j4o5db67t-mateus-de-paulas-projects.vercel.app/backend/videos.json')
    const videos = await api.json()

    try {
        videos.forEach(video => {
            const li = document.createElement('li')
            li.classList.add('videos__item')
            li.innerHTML = `
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="./img/sidebar/Avatar_Alura.png" alt="Ícone Alura">
                    <h5 class="titulo-video">${video.titulo}</h5>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria-video" hidden>${video.categoria}</p>
                </div>
            `
            videosContainer.append(li)
        })
    } catch(error) {
        searchVideos.innerHTML = `
            <p>Houve um erro ao carregar os vídeos: ${error}</p>
        `
    } finally {
        console.log('Sucesso ao carregar os vídeos!')
    }
}

consomeApi()

searchVideos.addEventListener('input', filtrarVideos)

function filtrarVideos() {
    let tituloBusca = searchVideos.value.toLowerCase()

    document.querySelectorAll('.videos__item').forEach(video => {
        let titulo = video.querySelector('.titulo-video').textContent.toLowerCase()
        video.style.display = titulo.includes(tituloBusca) ? 'block' : 'none'
    })
}

categoriaVideos.forEach(botao => {
    let nomeCategoria = botao.getAttribute('name')
    botao.addEventListener('click', () => filtraPorCategoria(nomeCategoria))
})

function filtraPorCategoria(filtro) {
    document.querySelectorAll('.videos__item').forEach(video => {
        let valorFiltro = filtro.toLowerCase()
        let categoria = video.querySelector('.categoria-video').textContent.toLowerCase()

        if (categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = 'block'    
        } else if (valorFiltro == 'tudo') {
            video.style.display = 'block'    
        } else {
            video.style.display = 'none'        
        }
    })
}
