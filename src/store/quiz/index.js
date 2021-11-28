import db from '@/db';
import firebaseObj from '@/firebase';

import {
  UPDATE_INFORMAITON,
  ADD_ANSWER,
  REMOVE_ANSWER,
  UPDATE_ANSWER,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  ADD_QUESTION,
  RESET_QUIZ,
  RESET_QUIZ_LIST,
  PUSH_QUIZ,
  SET_QUIZ
} from './mutations';

const state = {
  newQuiz: {
    title: "Quiz 2021",
    description: "An new and awesome quiz!",
    questions: [
      {
        question: "First Question",
        points: 50,
        answers: [
          {
            isRight: false,
            answer: "First answer"
          },
          {
            isRight: false,
            answer: "Second answer"
          },
          {
            isRight: false,
            answer: "Third answer"
          }
        ]
      },
      
    ]
  },

  list: [],

  quiz: null
};

const getters = {
  newQuiz: ({newQuiz}) => newQuiz,
  list: ({list}) => list,
  quiz: ({quiz}) => quiz
};

const mutations = {
  [UPDATE_INFORMAITON](state, info) {
    state.newQuiz.title = info.title;
    state.newQuiz.description = info.description;
  },

  [ADD_ANSWER](state, questionIndex) {
    const answers = state.newQuiz.questions[questionIndex].answers;
    if (answers.length < 5) {
      answers.push({
        answer: "Answer Text",
        isRight: false
      });
    }
  },

  [REMOVE_ANSWER](state, payload) {
    const questionIndex = payload.questionIndex;
    const answerIndex = payload.answerIndex;

    const question = state.newQuiz.questions[questionIndex];

    if (question.answers.length > 1) {
      question.answers.splice(answerIndex, 1);
    }
  },

  [UPDATE_ANSWER](state, payload) {
    const questionIndex = payload.questionIndex;
    const answerIndex = payload.answerIndex;
    const answerText = payload.answer;
    const isRight = payload.isRight;

    const answer = state.newQuiz
      .questions[questionIndex]
      .answers[answerIndex];

    answer.isRight = isRight;
    answer.answer = answerText;
  },

  [UPDATE_QUESTION](state, payload) {
    const question = state.newQuiz
            .questions[payload.questionIndex];

    question.question = payload.question;
    question.points = payload.points;
  },

  [REMOVE_QUESTION](state, questionIndex) {
    if (state.newQuiz.questions.length > 1) {
      state.newQuiz
        .questions
        .splice(questionIndex, 1);
    }
  },

  [ADD_QUESTION](state) {
    state.newQuiz
      .questions
      .push({
        question: "Question",
        points: 0,
        answers: []
      })
  },

  [RESET_QUIZ](state) {
    state.newQuiz = {
      title: "",
      description: "",
      questions: []
    }
  },

  [PUSH_QUIZ](state, quiz) {
    state.list.push(quiz);
  },

  [RESET_QUIZ_LIST](state) {
    state.list = [];
  },

  [SET_QUIZ](state, quiz) {
    state.quiz = quiz;
  }
};

const actions = {
  async create({state}) {
    const user = firebaseObj.auth().currentUser;
    // console.log(user)
    if (user) {

      // check if there is a question without a right answer
      state.newQuiz.questions.map(question => {
        let hasRightAnswer = false;

        question.answers.map(answer => {
          if (answer.isRight) hasRightAnswer = true;
        });

        if (!hasRightAnswer) {
          alert(`Question: '${question.question}' doesn't have a right answer!`);
          throw new Error();
        }
      });

      // save to database
      await db.collection('quizzes').add({
        ...state.newQuiz,
        userId: user.uid
      });

      alert('Quiz created');

    } else {
      alert('Unauthorized');
    }    
  },

  list({commit}) {
    commit(RESET_QUIZ_LIST);

    db.collection('quizzes').onSnapshot(snapshot => {
      snapshot.docChanges.forEach(function(change) {
        if (change.type === "added") {
          commit(PUSH_QUIZ, {
            id: change.doc.id,
            ...change.doc.data()
          });
        }
      });
    });
  },

  async get({commit}, id) {
    const quiz = await db.collection('quizzes').doc(id).get();

    if (quiz.exists) {
      commit(SET_QUIZ, {
        id: quiz.id,
        ...quiz.data()
      });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};