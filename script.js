
const API_KEY = '8a16638a14f485cfcd6cfa22792830c5';

async function searchMovie() {
    const query = document.getElementById('movieSearch').value;
    if (!query) return alert('Digite o nome de um filme.');

    const container = document.getElementById('movies');
    container.innerHTML = 'Carregando...';

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`);
        const data = await response.json();

        container.innerHTML = '';

        if (data.results.length === 0) {
            container.innerHTML = 'Nenhum filme encontrado.';
            return;
        }

        data.results.forEach(movie => {
            const movies = document.createElement('div');
            movies.classList.add('movie');

            movies.innerHTML = `
                <div class="movie-info">
                    <img src="${movie.poster_path ? 'https://image.tmdb.org/t/p/w200' + movie.poster_path : ''}" alt="${movie.original_title}">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-overview">${movie.overview}</div>
                    <div class="movie-release">${movie.release_date}</div>
                    <div class="movie-vote">${movie.vote_average}</div>
                </div>
            `;

            container.appendChild(movies);
        });
    } catch (error) {
        container.innerHTML = 'Erro ao buscar filmes. Tente novamente mais tarde.';
        console.error('Erro:', error);
    }
}

const input = document.getElementById('movieSearch');

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchMovie(); 
    }
});


