const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            biography: '',
            birthday: '',
            gender: '',
            departament: '',
            name: '',
            also_known_as: {
                name: ''
            },
            place_of_birth: '',
            popularity: '',
            profile_path: '',
            peliculas: null,
            peliculasC:'',
            imgRoute: 'https://image.tmdb.org/t/p/w500'
        }
    },
    methods: {
        back() {
            window.location.href = '../personas/populares.html';
            
        },
        getDatos() {
            let id = localStorage.getItem('id')
            let url = 'https://api.themoviedb.org/3/person/' + id + '?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US'

            fetch(url)
                .then((response) => response.json())
                .then((res) => (
                    (this.biography = res.biography),
                    (this.birthday = res.birthday),
                    (this.gender = (res.gender == 1) ? 'female' : 'Male'),
                    (this.departament = res.known_for_department),
                    (this.name = res.name),
                    (this.also_known_as = Array.from(res.also_known_as)),
                    (this.place_of_birth = res.place_of_birth),
                    (this.profile_path = res.profile_path),
                    (this.popularity = res.popularity)
                ))
                .catch((error) => console.log('error', error));
        },
        detalles(p) {
            localStorage.setItem('id', p.id);
            localStorage.setItem('media_type', p.media_type);
            window.location.href = "../pelicula.html";
        },
        getPeliculas() {
            let id = localStorage.getItem('id')
            let url = 'https://api.themoviedb.org/3/person/' + id + '/combined_credits?api_key=038eb1b67a577ce9afaf326a641856f8&language=en-US'

            fetch(url)
                .then((response) => response.json())
                .then((res) => (this.peliculas = res.cast,this.peliculasC=(res.cast)?'lleno':null))
                .catch((error) => console.log('error', error));
        }
    },
    mounted() {
        this.getDatos()
        this.getPeliculas()
    }
}).mount('#perfil')