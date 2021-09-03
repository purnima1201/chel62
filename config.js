import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDb5BQ9vBIg-M7RBo6B29WD_8roVvCXI-o",
  authDomain: "schoolattendence-4d6bd.firebaseapp.com",
  databaseURL: "https://schoolattendence-4d6bd-default-rtdb.firebaseio.com",
  projectId: "schoolattendence-4d6bd",
  storageBucket: "schoolattendence-4d6bd.appspot.com",
  messagingSenderId: "543737439640",
  appId: "1:543737439640:web:ec5284a110452ad983b7ed"
};
  firebase.initializeApp(firebaseConfig);
  export default firebase.database();