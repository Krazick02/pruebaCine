const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            // toda la información, favorito, rating, reparto, palabras clave, categoría, trailer, recomendaciones
            imgRoute: 'https://image.tmdb.org/t/p/w500',
            air_date: '',
            episodes: null,
            name: '',
            poster_path: '',
            overview: '',
            count: ''
        }
    },
    methods: {
        back() {
            window.location.href = '../html/pelicula.html';
        },
        getCaps(id, sea) {
            var url = 'https://api.themoviedb.org/3/tv/' + id + '/season/' + sea + '?api_key=038eb1b67a577ce9afaf326a641856f8'
            fetch(url)
                .then((response) => response.json())
                .then((res) => (
                    (this.air_date = res.air_date),
                    (this.episodes = Array.from(res.episodes)),
                    (this.count = res.episodes.length),
                    (this.name = res.name),
                    (this.poster_path = res.poster_path),
                    (this.overview = res.overview)
                ))
                .catch((error) => console.log('error', error));
        }
    },
    mounted() {
        let idOb = localStorage.getItem('id')
        let idS = localStorage.getItem('idS')
        this.getCaps(idOb, idS)

    }
}).mount('#verPelis')