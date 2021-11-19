import {
  UPDATE_INFORMAITON,
  ADD_ANSWER,
  REMOVE_ANSWER,
  UPDATE_ANSWER,
  UPDATE_QUESTION,
  REMOVE_QUESTION,
  ADD_QUESTION,
  RESET_QUIZ,
} from './mutations';

const state = {
  newQuiz: {
    title: "Quiz 2018",
    description: "An awesome quiz!",
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
};

const getters = {
  newQuiz: ({newQuiz}) => newQuiz
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
    this.newQuiz = {
      title: "",
      description: "",
      questions: []
    }
  }
};

const actions = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};