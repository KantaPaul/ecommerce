<template>
  <div class="product section-padding">
      <div class="alert alert-info" role="alert">
        <div class="media align-items-center">
          <a href="#" @click.prevent="isShowingCart = false" class="d-flex">Home</a>
          <div class="media-body d-flex align-items-center justify-content-end">
            <p class="mb-0 pr-3">{{ cart.length }} <template v-if="cart.length == 1">item</template> <template v-else>items</template> in cart, Totalling {{ cartTotal | currency }}</p>
            <button type="button" @click="isShowingCart = true" class="btn btn-info">View Cart</button>
          </div>
        </div>
      </div>
      <div class="row" v-if="!isShowingCart">
        <div class="col-md-4" v-for="(product, index) in products" :key="index">
          <div class="card">
            <img class="card-img-top" src="http://via.placeholder.com/400x250/000/fff" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">
                {{ product.title }}
              </h5>
              <p class="card-text">{{ product.description }}</p>
              <div class="clearfix mb-3">
                <span class="btn badge-primary float-left">
                 Price <span class="badge badge-light">{{ product.price | currency }}</span>
                </span>
                <span class="btn btn-info float-right" :class="{few : product.inStock <= 10, none: product.inStock == 0}">
                  In Stock <span class="badge badge-light">{{ product.inStock }}</span>
                </span>
              </div>
              <button type="submit" @click="addToCart(product)" class="btn btn-dark" :disabled="product.inStock == 0">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="display-5 text-center">Cart</h1>
        <table v-if="cart.length > 0" class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="index">
              <td><button :class="{disabled : item.quantity > 0}" type="submit" class="btn btn-danger" @click="removeItem(item)">Remove</button> &nbsp; {{ item.product.title }}</td>
              <td>
                <button type="submit" @click="itemDecerease(item)" :disabled="item.quantity == 0" class="btn btn-danger">-</button>
                {{ item.quantity }} &nbsp;
                <button type="submit" @click="itemIncrease(item)" :disabled="item.product.inStock == 0" class="btn btn-success">+</button>
              </td>
              <td>{{ item.quantity * item.product.price | currency }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="2">
                <strong>Subtotal</strong>
              </td>
              <td>{{ cartTotal | currency }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="2">
                <strong>Taxes</strong>
              </td>
              <td>{{ taxAmaunt | currency }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="2">
                <strong>Grandtotal</strong>
              </td>
              <td>{{ grandTotal | currency }}</td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td><button type="submit" class="btn btn-primary" @click="checkOut">Check Out</button></td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-center display-4 text-danger">Cart is empty</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      products: [
        {
          id: 1,
          title: 'Advanced Inox Grip Made in USA',
          description: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.',
          price: 2999,
          inStock: 9
        },
        {
          id: 2,
          title: 'Super Device Headphone',
          description: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.',
          price: 599,
          inStock: 0
        },
        {
          id: 3,
          title: 'Simple Super Headphone',
          description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete .',
          price: 299,
          inStock: 20
        },
        {
          id: 4,
          title: 'Loudspeaker Listening to Music',
          description: 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps.',
          price: 99,
          inStock: 100
        },
        {
          id: 5,
          title: 'Iphone 6 Plus Digitizer White',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. ',
          price: 199,
          inStock: 30
        },
        {
          id: 6,
          title: 'Smartphone 6 PRO Yellow',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.',
          price: 29,
          inStock: 40
        }
      ],
      cart: [],
      isShowingCart: false
    }
  },
  filters: {
    currency: function (value) {
      var formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })
      return formatter.format(value)
    }
  },
  methods: {
    addToCart: function (product) {
      var cartItem = this.getCartItem(product)
      if (cartItem != null) {
        cartItem.quantity++
      } else {
        this.cart.push({
          product: product,
          quantity: 1
        })
      }
      product.inStock--
    },
    getCartItem: function (product) {
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].product.id === product.id) {
          return this.cart[i]
        }
      }
      return null
    },
    itemIncrease: function (cartItem) {
      cartItem.product.inStock--
      cartItem.quantity++
    },
    itemDecerease: function (cartItem) {
      cartItem.product.inStock++
      cartItem.quantity--
    },
    removeItem: function (cartItem) {
      var index = this.cart.indexOf(cartItem)
      if (confirm('Are you remove this product')) {
        this.cart.splice(index, 1)
      }
    },
    checkOut: function () {
      if (confirm('Are you buy this product')) {
        this.cart.forEach(function (item) {
          item.product.inStock += item.quantity
        })
        this.cart = []
      }
    }
  },
  computed: {
    cartTotal: function () {
      var total = 0
      this.cart.forEach(function (item) {
        total += item.quantity * item.product.price
      })
      return total
    },
    taxAmaunt: function () {
      return ((this.cartTotal * 10) / 100)
    },
    grandTotal: function () {
      return (this.cartTotal + this.taxAmaunt)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin-bottom: 30px;
}
.section-padding {
  padding: 100px 0 70px;
}
.btn {
  border: 0;
}
.few {
  background-color: #ffc107;
}
.none {
  background-color: #dc3545;
}
</style>
