<template>
  <div class="about">
    <h1>This website was made with 💗 by Srijan Das</h1>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    document.title = `About | ${this.$store.state.website_name}`;
  },
};
</script>
