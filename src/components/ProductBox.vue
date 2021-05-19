<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img class="tumbnail_image" v-bind:src="product.get_thumbnail" />
      </figure>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">${{ product.price }}</p>

      <div class="btnContainer">
        <router-link
          v-bind:to="product.get_absolute_url"
          class="button is-dark mt-4"
          >View details</router-link
        >
        <button @click="addToCart()" class="button mt-4 is-success ml-2">
          <span class="icon"><i class="fas fa-shopping-cart"></i></span>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "bulma-toast";

export default {
  name: "ProductBox",
  props: {
    product: Object,
  },

  methods: {
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", item);

      toast({
        message: "The product was added to the cart",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
    },
  },
};
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
.tumbnail_image {
  object-fit: contain;
  max-height: 150px;
  margin-top: 20px;
}
</style>