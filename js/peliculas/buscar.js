const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            resultado: '',
            busqueda:'bad boys',
            imgRoute: 'https://image.tmdb.org/t/p/w500'
        }
    },
    methods: {
        detalles(p) {
            localStorage.setItem('id', p.id);
            window.location.href = "../pelicula.html";
        },
        tv(){
            localStorage.setItem('media_type','tv')
        },
        movie(){
            localStorage.setItem('media_type','movie')
        },
        buscar(e){
            e.preventDefault();
            this.getPeliculas()
        },
        getPeliculas() {
            var media=localStorage.getItem('media_type')
            fetch('https://api.themoviedb.org/3/search/'+media+'?api_key=038eb1b67a577ce9afaf326a641856f8&/&query='+this.busqueda)
                .then((response) => response.json())
                .then((res) => (this.resultado = res.results))
                .catch((error) => console.log('error', error));
        }
    },
    mounted() {
    }
}).mount('#buscando')

