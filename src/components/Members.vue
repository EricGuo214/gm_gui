<template>
  <div>
    <v-breadcrumbs :items="breadCrumbs" divider="/"></v-breadcrumbs>
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
    <v-spacer></v-spacer>
    <div></div>
    <v-row>
      <h3 class="mt-12">Add new member</h3>
    </v-row>
    <v-row>
      <h3 class="my-4"></h3>
    </v-row>
    <v-text-field
      v-model="name"
      dense
      label="Enter a member's name"
    ></v-text-field>
    <v-checkbox
      v-model="isEndUser"
      label="Is it a normal member (i.e., not a group)"
    ></v-checkbox>
    <v-btn color="primary" @click="onAddItem"> Add </v-btn>
  </div>
</template>

<script>
// import firebase from "firebase";
import apis from "@/apis.js";
import { mapMutations } from "vuex";

export default {
  components: {},
  props: ["tenantName", "groupName"],
  data: () => ({
    name: "",
    items: [],
    isEndUser: true,
    breadCrumbs: [],
  }),
  created() {
    this.listMembers(this.tenantName, this.groupName);
    this.breadCrumbs = [
      {
        text: "All tenants",
        to: "/tenants",
        exact: true,
      },
      {
        text: "Tenant: " + this.tenantName,
        to: ["/tenants", this.tenantName, "groups"].join("/"),
        exact: true,
      },
      {
        text: "Group: " + this.groupName,
      },
    ];
  },
  methods: {
    ...mapMutations(["setAlertMsg"]),
    listMembers(tenantName, groupName) {
      console.log("listMembers");
      apis
        .listMembers(tenantName, groupName)
        .then((res) => {
          this.items = res.data;
          console.log("members:", this.items);
        })
        .catch((error) => {
          this.setAlertMsg(error.response.data);
          // console.log("listMembers error:", error);
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
        .catch((error) => {
          this.setAlertMsg(error.response.data);
          // console.log("createMembers error:", error);
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
        .catch( (error) => {
          this.setAlertMsg(error.response.data);
          // console.log("deleteMembers error:", error);
        });
    },

    onDeleteItem(item) {
      console.log("onDelete item:", item);
      this.deleteMember(this.tenantName, this.groupName, item.name);
    },

    onAddItem() {
      this.createMember(this.tenantName, this.groupName, {
        name: this.name,
        endUser: this.isEndUser,
      });
    },

    onRefresh() {
      this.listMembers(this.tenantName, this.groupName);
    },
  },
};
</script>