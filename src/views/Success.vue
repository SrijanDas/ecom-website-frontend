<template>
  <div class="page-success">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">
          Thank you
          <span class="icon has-text-success">
            <i class="fas fa-check-circle"></i>
          </span>
        </h1>

        <p>Your order has been placed</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",

  mounted() {
    document.title = `Success | ${this.$store.state.website_name}`;
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
};
</script>