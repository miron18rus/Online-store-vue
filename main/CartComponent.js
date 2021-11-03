const cartItem = {
    props: ['cartItem','img'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$parent.remove(cart_item)">&times;</button>
                    </div>
                </div>
    `
}

const cart = {
    components: { 'cart-item': cartItem },
    data() {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://via.placeholder.com/50x100',
            showCart: false,
            cartItems: []
        }
    },
    methods: {
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        console.log('Some error');
                    }
                })
        },
        remove(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    }
                })
        },
    },
    mounted () {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents) {
                    this.$data.cartItems.push(el);
                }
            }); 
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <cart-item v-for="product of cartItems" 
                :key="item.id_product" 
                :img="imgCart" 
                :cart-item="product"></cart-item>
            </div>
        </div>
        `
}
