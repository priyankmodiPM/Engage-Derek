import firebase from 'firebase';
import db from '@/db';
import firebaseObj from '@/firebase';

import { SET_PROFILE, LOGOUT, SET_ROLE } from './mutations';

const state = {
  profile: {},
  loggedIn: false,
  role: true
};

const getters = {
  profile: ({profile}) => profile,
  loggedIn: ({loggedIn}) => loggedIn,
  role: ({role}) => role
};

const mutations = {
  [SET_PROFILE](state, profile) {
    state.loggedIn = true;
    state.profile = {
      name: profile.displayName,
      picture: profile.photoURL
    };
  },

  [LOGOUT](state) {
    state.loggedIn = false;
    state.profile = {};
  },

  [SET_ROLE](state, role){
    state.role = role;
  }
};

const actions = {
  async login(store) {
    // if user is already logged in return
    if (store.state.loggedIn){
      return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch(error) {
      console.log(error);
    }

    const user = firebaseObj.auth().currentUser;
    const id_user = user.uid;
    console.log(id_user);
    
    userNameRef.addListenerForSingleValueEvent(eventListener);
    const user_in_db = await db.collection('users').doc(id_user).get();
    if(user_in_db.exists){
      store.state.role = user_in_db.role;
    }else{
      // save to database
      await db.collection('users').add({
        userId: id_user,
        role: true
      });
      store.state.role = true
    }
  },

  async logout() {
    try {
      await firebase.auth().signOut();
    } catch(error) {
      console.log(error);
    }
  },

  async get({commit}, id) {
    const user = await db.collection('users').doc(id).get();

    if (user.exists) {
      commit(SET_ROLE, {
        id: user.id,
        ...user.data()
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