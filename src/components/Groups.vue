<template>
  <div>
    <v-breadcrumbs :items="breadCrumbs" divider="/"></v-breadcrumbs>
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
          <v-list-item-subtitle
            v-text="getAdminGroupName(item)"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    <div></div>
    <v-row>
      <h3 class="mt-12">Add new groups</h3>
    </v-row>
    <v-row>
      <h3 class="my-4"></h3>
    </v-row>
    <v-text-field
      v-model="name"
      dense
      label="Enter a group's name"
    ></v-text-field>
    <v-checkbox
      v-model="isSelfAdmin"
      label="Is this group self administrated?"
    ></v-checkbox>
    <v-text-field
      v-if="!isSelfAdmin"
      v-model="adminGroupName"
      label="Enter administrator group name"
    ></v-text-field>
    <v-btn color="primary" @click="onAddItem"> Add </v-btn>
  </div>
</template>

<script>
// import firebase from "firebase";
import apis from "@/apis.js";
import { mapMutations } from "vuex";

export default {
  components: {},
  props: ["tenantName"],
  data: () => ({
    name: "",
    isSelfAdmin: true,
    adminGroupName: "",
    items: [],
    breadCrumbs: [],
  }),
  created() {
    this.listGroups(this.tenantName);
    this.breadCrumbs = [
      {
        text: "All tenants",
        to: "/tenants",
        exact: true,
      },
      {
        text: "tenant: " + this.tenantName,
      },
    ];
  },
  methods: {
    ...mapMutations(["setAlertMsg"]),

    getAdminGroupName: function (group) {
      if (group.adminGroupName != null) {
        return group.adminGroupName;
      }
      return "This is self administrated";
    },
    listGroups(tenantName) {
      console.log("listGroups");
      apis
        .listGroups(tenantName)
        .then((res) => {
          this.items = res.data;
          console.log("groups:", this.items);
        })
        .catch((error) => {
          this.setAlertMsg(error.response.data);
          // console.log("listGroups error:", error);
        });
    },

    createGroup(tenantName, group) {
      console.log("createGroup");
      apis
        .createGroup(tenantName, group)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("created group: ", res.data);
          this.listGroups(this.tenantName);
        })
        .catch((error) => {
          this.setAlertMsg(error.response.data);
          // console.log("createGroups error:", error);
        });
    },

    deleteGroup(tenantName, groupName) {
      console.log("deleteGroup");
      apis
        .deleteGroup(tenantName, groupName)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("deleted tenant: ", res.data);
          this.listGroups(this.tenantName);
        })
        .catch((error) => {
          this.setAlertMsg(error.response.data);
          // console.log("deleteGroups error:", error);
        });
    },

    onDeleteItem(item) {
      console.log("onDelete item:", item);
      this.deleteGroup(this.tenantName, item.name);
    },

    onAddItem() {
      let group = {
        name: this.name,
        description: "blah",
        adminGroupName: null,
      };
      if (!this.isSelfAdmin) {
        group.adminGroupName = this.adminGroupName;
      }
      this.createGroup(this.tenantName, group);
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