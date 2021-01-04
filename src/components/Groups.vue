<template>
  <div>
    <h1>Your Groups Under {{ tenantName }}</h1>
    <v-btn color="primary" @click="onRefresh"> Refresh </v-btn>
    <v-list dense>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon medium @click="onShowMembers(item.name)">
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
      label="Enter a group's name"
    ></v-text-field>
    <v-btn color="primary" @click="onAddItem"> Add </v-btn>
  </div>
</template>

<script>
// import firebase from "firebase";
import apis from "@/apis.js";

export default {
  components: {},
  props: ["tenantName"],
  data: () => ({
    name: "",
    items: [],
  }),
  created() {
    this.listGroups(this.tenantName);
  },
  methods: {
    listGroups(tenantName) {
      console.log("listGroups");
      apis
        .listGroups(tenantName)
        .then((res) => {
          this.items = res.data;
          console.log("groups:", this.items);
        })
        .catch(function (error) {
          console.log("listGroups error:", error);
        });
    },

    createGroup(tenantName, group) {
      console.log("createGroup");
      apis
        .createGroup(tenantName, group)
        .then(this.listGroups(this.tenantName))
        .catch(function (error) {
          console.log("createGroups error:", error);
        });
    },

    deleteGroup(tenantName, groupName) {
      console.log("deleteGroup");
      apis
        .deleteGroup(tenantName, groupName)
        .then(this.listGroups(this.tenantName))
        .catch(function (error) {
          console.log("deleteGroups error:", error);
        });
    },

    onDeleteItem(item) {
      console.log("onDelete item:", item);
      this.deleteGroup(this.tenantName, item.name);
    },

    onAddItem() {
      this.createGroup(this.tenantName, {
        name: this.name,
        description: "blah",
      });
    },

    onRefresh() {
      this.listGroups(this.tenantName);
    },

    onShowMembers(name) {
      this.$router.push(
        "/tenants/" + this.tenantName + "/groups/" + name + "/members"
      );
    },
  },
};
</script>