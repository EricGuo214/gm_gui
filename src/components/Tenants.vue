<template>
  <div>
    <h1>Registered Tenants</h1>
    <v-btn color="primary" @click="listTenants"> Refresh </v-btn>
    <v-list dense>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon
            medium
            @click="onShowGroups(item.name)"
            :color="getColor(accessibles[i])"
          >
            mdi-account-multiple
          </v-icon>
          <v-icon
            medium
            @click="onShowGroupTree(item.name)"
            :color="getColor(accessibles[i])"
          >
            mdi-file-tree
          </v-icon>
          <v-icon
            medium
            @click="onDeleteItem(item)"
            :color="getColor(accessibles[i])"
          >
            mdi-delete ></v-icon
          >
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
      @keydown.enter="onAddItem"
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
    accessibles: [],
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
          apis
            .testTenants({ tenants: res.data })
            .then((res) => {
              this.items = res.data.tenants;
              this.accessibles = res.data.accessibles;
            })
            .catch((error) => {
              console.log("testTenants error:", error);
            });
        })
        .catch(function (error) {
          console.log("listTenants error:", error);
        });
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

    onShowGroupTree(name) {
      this.$router.push("/tenants/" + name + "/groupTree");
    },

    getColor(accessible) {
      if (accessible) {
        return "primary";
      }
      return "gray";
    },
  },
};
</script>