import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyDDvSJAq7pyjlbxlUN9UibRzOrBc0GJ0Hw",
  authDomain: "resume-dev-237111.firebaseapp.com",
  databaseURL: "https://resume-dev-237111.firebaseio.com",
  projectId: "resume-dev-237111",
  storageBucket: "resume-dev-237111.appspot.com",
  messagingSenderId: "263885238756",
  appId: "1:263885238756:web:bd6fd876fce415d6"
};
firebase.initializeApp(firebaseConfig);
console.log(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
