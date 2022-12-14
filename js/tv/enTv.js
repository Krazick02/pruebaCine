const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            poTv: '',
            imgRoute: 'https://image.tmdb.org/t/p/w500'
        }
    },
    methods: {
        detalles(p) {
            localStorage.setItem('id', p.id);
            window.location.href = "../pelicula.html";
        },
        getpoTv() {
            fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US&page=1')
                .then((response) => response.json())
                .then((res) => (this.poTv = res.results))
                .catch((error) => console.log('error', error));
        }
    },
    mounted() {
        localStorage.setItem('media_type', 'tv')
        this.getpoTv()
    }
}).mount('#poTv')