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
    <button
      v-if="canCancelOrder"
      class="button is-light"
      @click="openModal = 'is-active'"
    >
      Cancel Order
    </button>

    <div class="modal" v-bind:class="openModal">
      <div v-on:click="openModal = ''" class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Cancel Order : {{ order.id }}</p>
          <button
            v-on:click="openModal = ''"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Reason for cancellation</label>
            <div class="control">
              <textarea
                v-model="reasonForCancellation"
                class="textarea"
                placeholder="Textarea"
              ></textarea>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="cancelOrder(order.id)" class="button">Confirm</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OrderSummary",
  props: {
    order: Object,
  },
  data() {
    return {
      statusClass: "has-text-warning",
      statusIcon: "fas fa-exclamation-triangle",
      canCancelOrder: false,
      openModal: "",
      reasonForCancellation: "",
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
        this.canCancelOrder = true;
        this.statusClass = "has-text-info";
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
    async cancelOrder(orderId) {
      const data = {
        order_id: orderId,
        reason: this.reasonForCancellation,
      };
      await axios
        .post("/cancel-order/", data)
        .then((res) => {
          // console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.openModal = "";
          toast({
            message: "Something went wrong! Please try again",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });
    },
  },
};
</script>