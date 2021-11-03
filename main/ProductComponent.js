const product = {
     props: ['product', 'img'],
     template: `
             <div class="product-item">
                 <img :src="img" alt="Some img">
                 <div class="desc">
                     <h3>{{product.product_name}}</h3>
                     <p>{{product.price}}</p>
                     <button class="buy-btn"
                     @click="$root.$refs.cart.addProduct(product)">Купить</button>
                 </div>
             </div>
     `
 }

 const products = {
     components: {product},
     data () {
         return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgProduct: 'https://via.placeholder.com/200x150',
            filtered: [],
         }
     },
     mounted () { 
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            }); 
     },

     methods: {
        filter(val){
            let regExp = new RegExp(val, 'i');
            this.filtered = this.products.filter(el => regExp.test(el.product_name));
        }
     },
     template: `<div class="products">
                    <product v-for="item of products" 
                    :key="item.id_product" 
                    :img="img"
                    :product="item"></product>
                </div>` 
 }

