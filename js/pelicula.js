const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            // toda la información, favorito, rating, reparto, palabras clave, categoría, trailer, recomendaciones
            pelicula: {
                poster_path: '',
                title: '',
                release_date: '',
                overview: '',
                popularity: '',
                release_date: '',
                vote_average: '',
                tagline: '',
                original_lenguage: '',
                status: '',
                vote_count: '',
                backdrop_path: '',
                budget: '',
                id: '',
                revenue: ''
            },
            baseyt: 'https://www.youtube.com/watch?v=',
            videos: null,
            reparto: {
                cast: null,
                crew: null
            },
            claves: null,
            categorias: '',
            recomendaciones: '',
            imgRoute: 'https://image.tmdb.org/t/p/w500',
            media: '',

            // series

            serie: {
                backdrop_path: '',
                first_air_date: '',
                name: '',
                original_language: '',
                original_name: '',
                overview: '',
                popularity: '',
                poster_path: '',
                status: '',
                tagline: '',
                vote_average: '',
                type: '',
                vote_count: '',
                id: '',
                seasons: null
            },
            seasons: null
        }
    },
    methods: {
        back() {
            window.location.href = '../html/home.html';
        },
        getvideo(id, media) {
            var url = 'https://api.themoviedb.org/3/' + media + '/' + id + '/videos?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US'
            console.log('serie : ' + url)
            fetch(url)
                .then((response) => response.json())
                .then(res => {
                    let vid = [];
                    res.results.forEach(v => {
                        if (v.site == 'YouTube' && v.type == 'Trailer') {
                            console.log(v)
                            vid.push(`
                            <iframe name='${v.name}' width="560" height="315" src="https://www.youtube.com/embed/${v.key}" 
                            title="${v.name}" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>`)
                        }
                        document.getElementById('overlay-content').innerHTML = vid.join('')
                    });
                })
                .catch((error) => console.log('error', error));

        },
        detalles(p) {
            localStorage.setItem('id', p);
            window.location.href = "../html/pelicula.html";
        },
        detallesSeason(p) {
            localStorage.setItem('idS', p);
            window.location.href = "../html/temporada.html";
        },
        informacion(p) {
            localStorage.setItem('id', p.id);
            window.location.href = "../html/personas/perfil.html";
        },
        getData(id) {
            var url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US'

            fetch(url)
                .then((response) => response.json())
                .then((res) => (
                    (this.pelicula.poster_path = res.poster_path),
                    (this.pelicula.title = res.title),
                    (this.pelicula.release_date = res.release_date),
                    (this.pelicula.overview = res.overview),
                    (this.pelicula.popularity = res.popularity),
                    (this.pelicula.release_date = res.release_date),
                    (this.pelicula.vote_average = (Math.trunc(res.vote_average * 10))),
                    (this.pelicula.vote_count = res.vote_count),
                    (this.pelicula.original_lenguage = res.original_lenguage),
                    (this.pelicula.tagline = res.tagline),
                    (this.pelicula.budget = res.budget),
                    (this.pelicula.revenue = res.revenue),
                    (this.pelicula.id = res.id),
                    (this.pelicula.status = res.status)

                ))
                .catch((error) => console.log('error', error));
        },
        getPalabras(id) {
            var url = 'https://api.themoviedb.org/3/tv/' + id + '/keywords?api_key=038eb1b67a577ce9afaf326a641856f8'
            fetch(url)
                .then((response) => response.json())
                .then((res) => (this.claves = Array.from(res.results)))
                .catch((error) => console.log('error', error));
        },
        getCast(id) {
            var url = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US'
            fetch(url)
                .then((response) => response.json())
                .then((res) => ((this.reparto.crew = res.crew), (this.reparto.cast = res.cast)))
                .catch((error) => console.log('error', error));
        },
        getRecomendaciones(id) {
            var url = 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US&page=1'
            fetch(url)
                .then((response) => response.json())
                .then((res) => (this.recomendaciones = res.results))
                .catch((error) => console.log('error', error));
        },
        getPalabrasMv(id) {
            var url = 'https://api.themoviedb.org/3/movie/' + id + '/keywords?api_key=038eb1b67a577ce9afaf326a641856f8'
            fetch(url)
                .then((response) => response.json())
                .then((res) => (this.claves = Array.from(res.keywords)))
                .catch((error) => console.log('error', error));
        },
        getDataTv(id) {
            var url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US'

            fetch(url)
                .then((response) => response.json())
                .then((res) => (
                    (this.serie.poster_path = res.poster_path),
                    (this.serie.name = res.name),
                    (this.serie.first_air_date = res.first_air_date),
                    (this.serie.overview = res.overview),
                    (this.serie.popularity = res.popularity),
                    (this.serie.seasons = Array.from(res.seasons)),
                    (this.serie.vote_average = (Math.trunc(res.vote_average * 10))),
                    (this.serie.vote_count = res.vote_count),
                    (this.serie.original_name = res.original_name),
                    (this.serie.original_language = res.original_language),
                    (this.serie.tagline = res.tagline),
                    (this.serie.id = res.id),
                    (this.serie.type = res.type),
                    (this.serie.status = res.status),
                    console.log(res)
                ))
                .catch((error) => console.log('error', error));
        },
        getCastTv(id) {
            var url = 'https://api.themoviedb.org/3/tv/' + id + '/credits?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US'
            fetch(url)
                .then((response) => response.json())
                .then((res) => ((this.reparto.crew = res.crew), (this.reparto.cast = res.cast)))
                .catch((error) => console.log('error', error));
        },
        getRecomendacionesTv(id) {
            var url = 'https://api.themoviedb.org/3/tv/' + id + '/recommendations?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US&page=1'
            fetch(url)
                .then((response) => response.json())
                .then((res) => (this.recomendaciones = res.results))
                .catch((error) => console.log('error', error));
        }
    },
    mounted() {
        let idOb = localStorage.getItem('id')
        this.media = localStorage.getItem('media_type')
        if (this.media == 'movie') {
            this.getvideo(idOb, 'movie')
            this.getData(idOb)
            this.getCast(idOb)
            this.getRecomendaciones(idOb)
            this.getPalabrasMv(idOb)
        } else {
            this.getvideo(idOb, 'tv')
            this.getPalabras(idOb)
            this.getDataTv(idOb)
            this.getRecomendacionesTv(idOb)
            this.getCastTv(idOb)
        }
    }
}).mount('#verPelis')