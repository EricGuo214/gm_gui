<template>
  <div>
    <v-btn color="primary" @click="listTenants"> Refresh </v-btn>
    <v-list dense>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon medium @click="onDeleteItem(item)"> mdi-delete ></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-text-field
      v-model="name"
      dense
      label="Enter a tenant's name"
    ></v-text-field>
    <v-btn color="primary" @click="onAddItem"> Add </v-btn>
  </div>
</template>

<script>
// import firebase from "firebase";
import apis from "@/apis.js";

export default {
  data: () => ({
    name: "",
    items: [],
    user: { email: "" },
  }),
  created() {
    this.listTenants();
  },
  methods: {
    listTenants() {
      console.log("listTenants");
      apis
        .listTenants()
        .then((res) => {
          this.items = res.data;
          console.log("tenants:", this.items);
        })
        .catch(function (error) {
          console.log("listTenants error:", error);
        });
    },
    onDeleteItem(item) {
      console.log("onDelete item:", item);
      this.listTenants();
    },
    onAddItem() {
      this.listTenants();
    },
  },
};
</script>