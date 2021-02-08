<template>
  <div>
    <v-treeview
      :active.sync="active"
      :items="items"
      :load-children="onLoadChildren"
      :open.sync="open"
      activatable
      color="warning"
      open-on-click
      transition
      dense
    >
      <template v-slot:prepend="{ item }">
        <v-icon v-if="!item.children" small> mdi-account </v-icon>
        <v-icon v-else small> mdi-account-multiple </v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
// import firebase from "firebase";
import apis from "@/apis.js";

export default {
  components: {},
  props: ["tenantName"],
  data: () => ({
    active: [],
    open: [],
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
          this.items = this.groupsToTreeItems(res.data);
          console.log("groups:", this.items);
        })
        .catch(function (error) {
          console.log("listGroups error:", error);
        });
    },

    groupsToTreeItems(groups) {
      let items = [];
      for (let group of groups) {
        let item = group;
        item.id = group.name;
        item.name = group.name;
        item.children = [];
        items.push(item);
      }
      return items;
    },

    async onLoadChildren(item) {
      console.log("onLoadChildren item", item);
      return apis
        .listMembers(this.tenantName, item.name)
        .then((res) => {
          console.log("members:", res.data);
          item.children = this.membersToTreeItems(res.data, item.name);
        })
        .catch(function (error) {
          console.log("listMembers error:", error);
        });
    },

    membersToTreeItems(members, groupName) {
      let items = [];
      for (let member of members) {
        let item = member;
        item.id = groupName + "/" + member.name;
        if (!member.endUser) {
          item.children = [];
        }
        items.push(item);
      }
      return items;
    },
  },
};
</script>

