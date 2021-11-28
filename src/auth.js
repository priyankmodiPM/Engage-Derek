import firebaseObj from './firebase';
import store from './store';
import { SET_PROFILE, LOGOUT } from '@/store/user/mutations';

// console.log("firebase", firebase)

// console.log("pui",firebaseObj);
// console.log("pui2",app2.auth());

firebaseObj.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.commit(`user/${SET_PROFILE}`, user);
  } else {
    store.commit(`user/${LOGOUT}`);
  }
});