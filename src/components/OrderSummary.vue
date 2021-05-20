<template>
  <div class="box mb-4">
    <h3 class="is-size-4">Order id: {{ order.id }}</h3>
    <p class="is-size-5 has-text-weight-medium" v-bind:class="statusClass">
      {{ getOrderStatus(order.order_status) }}
      <span class="icon">
        <i v-bind:class="statusIcon"></i>
      </span>
    </p>
    <div class="shippingDetails mb-3 mt-6">
      <h1 class="title mb-1">{{ order.first_name }} {{ order.last_name }}</h1>
      <p>
        {{ order.address }}, {{ order.place }}, PIN Code: {{ order.zipcode }}
      </p>
      <p>Phone: {{ order.phone }}</p>
      <p>email: {{ order.email }}</p>
    </div>

    <h3 class="is-size-4 has-text-weight-semibold mb-5">
      Total: ${{ order.paid_amount }}
    </h3>

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
  data() {
    return {
      statusClass: "has-text-warning",
      statusIcon: "fas fa-exclamation-triangle",
    };
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
    getOrderStatus(orderStatus) {
      let readableStatus = "";
      if (orderStatus === "YTD") {
        readableStatus = "Yet to dispatch";
        this.statusClass = "has-text-primary";
        this.statusIcon = "fas fa-info-circle";
      } else if (orderStatus === "SHP") {
        readableStatus = "Shipped";
        this.statusClass = "has-text-success";
        this.statusIcon = "fas fa-check-square";
      } else if (orderStatus === "DIS") {
        readableStatus = "Dispatched";
        this.statusClass = "has-text-info";
        this.statusIcon = "fas fa-truck";
      } else if (orderStatus === "CAN") {
        readableStatus = "Cancelled";
        this.statusClass = "has-text-danger";
        this.statusIcon = "fas fa-window-close";
      } else {
        readableStatus = "In progress";
      }
      return readableStatus;
    },
    getStatusClass() {
      let statusClass = "";
      if (orderStatus === "YTD") {
        statusClass = "Yet to dispatch";
      } else if (orderStatus === "SHP") {
        statusClass = "Shipped";
      } else if (orderStatus === "DIS") {
        statusClass = "Dispatched";
      } else if (orderStatus === "CAN") {
        statusClass = "Cancelled";
      } else {
        statusClass = "In progress";
      }
      return statusClass;
    },
  },
};
</script>