const {
    createApp
} = Vue

const myApp = createApp({
    data() {
        return {
            usernameF: '',
            passwordF: ''
        }
    },
    methods: {
        login(e) {

            var data = new FormData();

            data.append('username', this.usernameF);
            data.append('password', this.passwordF);
            data.append('request_token', '');
            var config = {
                method: 'post',
                url: 'https://api.themoviedb.org/3/authentication/token/validate_with_login',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzhlYjFiNjdhNTc3Y2U5YWZhZjMyNmE2NDE4NTZmOCIsInN1YiI6IjYzMjAwZDg1MzkyNzEyMDA3YjIyMzI2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2tuQv9jeD3VJUl3zi4-M09IFzII6mQm-8k49b5zSkVw',
                },
                data,
            };
            axios(config)
                .then(function(response) {
                    if (response.data.success) {
                        localStorage.setItem('username',this.usernameF)
                        window.location.href = '../html/perfil.html';
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alert('Datos incorrectos');
                });

            e.preventDefault();
        },
    },
    mounted() {

    }
}).mount('#myapp')