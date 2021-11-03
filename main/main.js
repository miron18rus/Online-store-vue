const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgProduct: 'https://via.placeholder.com/200x150',
        showCart: false,
        filtered: [],     
    },
    components: {cart, products, filter_item},
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
            }
        },
    })