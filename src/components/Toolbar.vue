<template functional>
  <v-app-bar app dark color="primary">
    <v-app-bar-title class="white--text ml-5">Derek</v-app-bar-title>
    <v-spacer />

    <v-menu
      v-if="props.loggedIn"
      auto
      offset-y
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-avatar slot="activator" class="mr-5">
          <img :src="props.profile.picture" />
        </v-avatar>
        <v-list>
          <v-list-item v-on="on" @click="props.logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-menu>
    <v-btn
      class="mr-5"
      v-else
      text
      @click="props.login"
    >Login</v-btn>
  </v-app-bar>
</template>