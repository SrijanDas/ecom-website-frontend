<template>
  <div class="navbar">
    <div>
      <router-link to="/" class="navbar__brand"
        ><strong> {{ brandName }} </strong></router-link
      >
    </div>
    <div class="navbar__rightItems">
      <div class="cart">
        <router-link to="/cart" class="button is-success">
          <span class="icon"><i class="fas fa-shopping-cart"></i></span>
          <span>Cart ({{ cartTotalLength }})</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["brandName"],
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #363636;
  display: flex;
  align-items: center;
  padding: 10px;
}
.navbar__brand {
  color: white;
}
</style>