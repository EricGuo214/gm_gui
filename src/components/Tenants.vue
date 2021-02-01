<template>
  <div>
    <h1>Your Tenants</h1>
    <v-btn color="primary" @click="listTenants"> Refresh </v-btn>
    <v-list dense>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon medium @click="onShowGroups(item.name)">
            mdi-account-multiple ></v-icon
          >
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
  }),
  created() {
    this.listTenants();
  },
  computed: {},
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

    listTenantsDelayed(){
      setTimeout(this.listTenants, 1000)
    },

    createTenant(tenant) {
      console.log("createTenant");
      apis
        .createTenant(tenant)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("created tenant: ", res.data);
          this.listTenants();
        })
        .catch(function (error) {
          console.log("createTenants error:", error);
        });
    },

    deleteTenant(tenantName) {
      console.log("deleteTenant");
      apis
        .deleteTenant(tenantName)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("deleted tenant: ", res.data);
          this.listTenants();
        })
        .catch(function (error) {
          console.log("deleteTenants error:", error);
        });
    },

    onDeleteItem(item) {
      console.log("onDelete item:", item);
      this.deleteTenant(item.name);
    },

    onAddItem() {
      this.createTenant({ name: this.name, description: "blah" });
    },

    onShowGroups(name) {
      this.$router.push("/tenants/" + name + "/groups");
    },
  },
};
</script>