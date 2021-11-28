<template>
  <v-layout row wrap>
    <!-- <login 
      v-show="role!==true"
    /> -->
    <quiz-card
      v-show="loggedIn"
      v-for="quiz in quizes"
      :key="quiz.id"
      :title="quiz.title"
      :description="quiz.description"
      :id="quiz.id"
      :role="role"
    />

    <v-flex xs12>
      <v-btn
        v-show="loggedIn && role"
        absolute
        dark
        fab
        bottom
        right
        color="purple"
        to="/create"
        class="mb-5"
      >
        <v-icon>add</v-icon>

      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import QuizCard from '@/components/quiz/QuizCard';
  import Login from '@/components/Login';
  export default {
    name: 'home',
    components: {
      QuizCard,
      Login
    },
    created() {
      this.findQuizes();
    },
    computed: {
      ...mapGetters('user', {
        loggedIn: 'loggedIn',
        role: 'role',
      }),
      ...mapGetters('quiz', {
        quizes: 'list'
      })
    },
    methods: {
      ...mapActions('quiz', {
        findQuizes: 'list'
      })
    }
  }
</script>