<template>
  <v-app>
    <v-app-bar app dense dark color="blue darken - 3">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Group Management</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <v-btn color="primar" dark v-on="on">{{ user.email }}</v-btn>
        </template>
        <v-list>
          <v-list-item to="/profile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onSignout">
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else to="/SignIn">Sign in</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/tenants">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tenant</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-alert dense type="warning" dismissible v-if="alertMsg != ''">
          {{ alertMsg }}
        </v-alert>

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      group: null,
      user: null,
    };
  },
  computed: {
    ...mapGetters(["alertMsg"]),
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    onSignout(e) {
      e.stopPropagation();
      firebase.auth().signOut();
    },
  },
};
</script>