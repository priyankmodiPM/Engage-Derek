<template v-slot:activator="{ on }">
  <v-app>
    <toolbar
      :login="login"
      :logout="logout"
      :profile="profile"
      :loggedIn="loggedIn"
    />
    <v-main>
      <v-card v-show="!loggedIn">
        <div class="d-flex flex-column justify-space-between align-center">
          <v-img
            src="../public/img/empty-state-generic.png"
          ></v-img>
          <h2 class="d-flex flex-column justify-space-between align-center">
            Oops. You need to login to begin attempting and creating quizzes.
          </h2>
        </div>
      </v-card>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Toolbar from '@/components/Toolbar';
  export default {
    name: 'app',
    components: { Toolbar },
    computed: {
      ...mapGetters('user', {
        profile: 'profile',
        loggedIn: 'loggedIn',
        role: 'role'
      })
    },
    methods: {
      ...mapActions('user', {
        login: 'login',
        logout: 'logout'
      })
    }
  };
</script>