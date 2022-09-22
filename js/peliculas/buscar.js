const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            resultado: '',
            busqueda: 'bad boys',
            imgRoute: 'https://image.tmdb.org/t/p/w500'
        }
    },
    methods: {
        detalles(p) {
            localStorage.setItem('id', p.id);
            window.location.href = "../pelicula.html";
        },
        tv() {
            localStorage.setItem('media_type', 'tv')
            this.getPeliculas()
        },
        movie() {
            localStorage.setItem('media_type', 'movie')
            this.getPeliculas()
        },
        palabra() {
            this.getPalabra()
        },
        categoria() {
            this.getPeliculas()
        },
        getPeliculas() {
            var media = localStorage.getItem('media_type')
            fetch('https://api.themoviedb.org/3/search/' + media + '?api_key=038eb1b67a577ce9afaf326a641856f8&/&query=' + this.busqueda)
                .then((response) => response.json())
                .then((res) => (this.resultado = res.results))
                .catch((error) => console.log('error', error));
        },
        coincidencias(n) {
            var media = localStorage.getItem('media_type')
            fetch('https://api.themoviedb.org/3/discover/' + media + '?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US&with_genres=' + n + '&sort_by=popularity.desc')
                .then((response) => response.json())
                .then((res) => (this.resultado = res.results))
                .catch((error) => console.log('error', error));
        }
    },
    mounted() {}
}).mount('#buscando')