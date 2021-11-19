import firebase from 'firebase';
require('firebase/auth');
require('firebase/firestore');

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCQhUP2_FJNN6PO65U8ESecVyKxo35E16A",
  authDomain: "engage-2e9d9.firebaseapp.com",
  projectId: "engage-2e9d9",
  databaseURL: "https://engage-2e9d9-default-rtdb.firebaseio.com/",
  storageBucket: "engage-2e9d9.appspot.com",
  messagingSenderId: "1040321943527"
});
// console.log("firebaseApp",firebaseApp);
// console.log("firebaseApp-auth",firebaseApp.auth());
const auth2 = firebaseApp.auth();
export default auth2;