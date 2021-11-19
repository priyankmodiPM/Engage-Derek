import auth2 from './firebase';
import store from './store';
import { SET_PROFILE, LOGOUT } from '@/store/user/mutations';

// console.log("firebase", firebase)

// console.log("pui",auth2);
// console.log("pui2",app2.auth());

auth2.onAuthStateChanged(function(user) {
  if (user) {
    store.commit(`user/${SET_PROFILE}`, user);
  } else {
    store.commit(`user/${LOGOUT}`);
  }
});