<template>
  <tr class="tableRow">
    <td>
      <router-link :to="item.product.get_absolute_url">
        <div class="product">
          <figure class="image is-48x48 mr-3">
            <img v-bind:src="item.product.get_thumbnail" />
          </figure>
          {{ item.product.name }}
        </div>
      </router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      <div class="qtyContainer">
        {{ item.quantity }}
        <div class="btnContainer">
          <a class="button is-small" @click="incrementQuantity(item)">+</a>
          <a class="button is-small" @click="decrementQuantity(item)">-</a>
        </div>
      </div>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.$emit("removeFromCart", item);
      }
      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
      this.updateCart();
    },
  },
};
</script>

<style scoped>
.tableRow {
}
.product {
  display: flex;
  align-items: center;
}
.image {
  object-fit: contain !important;
}
.btnContainer {
  display: flex;
  flex-direction: column;
}
.qtyContainer {
  display: flex;
  max-width: 4rem;
  justify-content: space-between;
}
</style>