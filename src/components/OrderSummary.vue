<template>
  <div class="box mb-4">
    <h3 class="is-size-4 mb-6">Order #{{ order.id }}</h3>

    <div class="shippingDetails mb-3">
      <h1 class="title mb-1">{{ order.first_name }} {{ order.last_name }}</h1>
      <p>
        {{ order.address }}, {{ order.place }}, PIN Code: {{ order.zipcode }}
      </p>
      <p>Phone: {{ order.phone }}</p>
      <p>email: {{ order.email }}</p>
    </div>

    <h3 class="is-size-4 has-text-weight-semibold mb-6">
      Total: ${{ order.paid_amount }}
    </h3>

    <h4 class="is-size-5">Products</h4>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in order.items" v-bind:key="item.product.id">
          <td>{{ item.product.name }}</td>
          <td>${{ item.product.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ getItemTotal(item).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderSummary",
  props: {
    order: Object,
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    orderTotalLength(order) {
      return order.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
};
</script>