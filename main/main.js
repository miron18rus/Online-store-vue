const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue ({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://via.placeholder.com/50x100',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
       /*  addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if(find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({quantity: 1}, item);
                            this.cartItems.push(prod)
                        }
                    }
                })
            } */

            filter() {
                const regexp = new RegExp(this.userSearch, 'i');
                this.filtered = this.products.filter(el => regexp.test(el.product_name));
            },
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let item of data.contents) {
                    this.cartItems.push(item);
                }
            }); 
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            }); 
    }
})