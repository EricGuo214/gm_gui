<template>
  <div>
    <h1>Your Members Under Group {{ groupName }}</h1>
    <v-btn color="primary" @click="onRefresh"> Refresh </v-btn>
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
      label="Enter a member's name"
    ></v-text-field>
    <v-btn color="primary" @click="onAddItem"> Add </v-btn>
  </div>
</template>

<script>
// import firebase from "firebase";
import apis from "@/apis.js";

export default {
  components: {},
  props: ["tenantName", "groupName"],
  data: () => ({
    name: "",
    items: [],
  }),
  created() {
    this.listMembers(this.tenantName, this.groupName);
  },
  methods: {
    listMembers(tenantName, groupName) {
      console.log("listMembers");
      apis
        .listMembers(tenantName, groupName)
        .then((res) => {
          this.items = res.data;
          console.log("members:", this.items);
        })
        .catch(function (error) {
          console.log("listMembers error:", error);
        });
    },

    createMember(tenantName, groupName, member) {
      console.log("createMember");
      apis
        .createMember(tenantName, groupName, member)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("created member: ", res.data);
          this.listMembers(this.tenantName, this.groupName);
        })
        .catch(function (error) {
          console.log("createMembers error:", error);
        });
    },

    deleteMember(tenantName, groupName, memberName) {
      console.log("deleteMember");
      apis
        .deleteMember(tenantName, groupName, memberName)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("deleted member: ", res.data);
          this.listMembers(this.tenantName, this.groupName);
        })
        .catch(function (error) {
          console.log("deleteMembers error:", error);
        });
    },

    onDeleteItem(item) {
      console.log("onDelete item:", item);
      this.deleteMember(this.tenantName, this.groupName, item.name);
    },

    onAddItem() {
      this.createMember(this.tenantName, this.groupName, {
        name: this.name,
      });
    },

    onRefresh() {
      this.listMembers(this.tenantName, this.groupName);
    },
  },
};
</script>