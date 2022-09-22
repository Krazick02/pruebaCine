const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            popular: '',
            imgRoute: 'https://image.tmdb.org/t/p/w500'
        }
    },
    methods: {
        detalles(p) {
            localStorage.setItem('id', p.id);
            window.location.href = "../pelicula.html";
        },
        getPeliculas() {
            fetch('https://api.themoviedb.org/3/tv/popular?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US&page=1')
                .then((response) => response.json())
                .then((res) => (this.popular = res.results))
                .catch((error) => console.log('error', error));
        }
    },
    mounted() {
        this.getPeliculas()
    }
}).mount('#popular')