<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Cart</h1>
      </div>

      <div class="column is-full box">
        <div class="table-container">
          <table class="table is-fullwidth" v-if="cartTotalLength">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <CartItem
                v-for="item in cart.items"
                v-bind:key="item.product.id"
                v-bind:initialItem="item"
                v-on:removeFromCart="removeFromCart"
              />
            </tbody>
          </table>
          <p v-else>You don't have any products in your cart...</p>
        </div>
      </div>

      <div class="column is-12 box" v-if="cartTotalLength">
        <h2 class="subtitle">Summary</h2>

        <strong>${{ cartTotalPrice.toFixed(2) }}</strong
        >, {{ cartTotalLength }} items

        <hr />

        <router-link
          v-if="this.$store.state.isAuthenticated"
          to="/cart/checkout"
          class="button is-dark"
          >Proceed to checkout</router-link
        >
        <router-link v-else to="/login" class="button is-dark"
          >Log in to proceed</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from "../components/CartItem";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  mounted() {
    this.cart = this.$store.state.cart;
    document.title = `Cart | ${this.$store.state.website_name}`;
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
  },
};
</script>
<style scope>
</style>
