import * as firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyC9DZtmJ_bDrC0YkOxVWF2S2jP4gpX06f8",
  authDomain: "scenario-tool.firebaseapp.com",
  databaseURL: "https://scenario-tool.firebaseio.com",
  projectId: "scenario-tool",
  storageBucket: "scenario-tool.appspot.com",
  messagingSenderId: "75545633744",
  appId: "1:75545633744:web:e1b43c7440c2290d020fd5"
};
var signInBtn = document.getElementById("signInBtn");
var loginBtn = document.getElementById("loginBtn");
var signInGoogleBtn = document.getElementById("signInGoogleBtn");

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "pt";
provider.addScope("profile");
provider.addScope("email");
provider.setCustomParameters({
  login_hint: "user@example.com"
});

// Register Events
signInBtn.addEventListener("click", e => {
  createNewUser(getEmail(), getPassword());
});
loginBtn.addEventListener("click", e => {
  loginExistingUser(getEmail(), getPassword());
});
signInGoogleBtn.addEventListener("click", e => {
  loginWithGoogle();
});

// Helper functions
function getEmail() {
  return document.getElementById("login-form-email").value;
}
function getPassword() {
  return document.getElementById("login-form-password").value;
}

function goToMain() {
  window.location.replace("/main/index.html");
}

// Firebase stuff
function createNewUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(success => {
      console.log("register success");
      goToMain();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      debugger;
    });
}

function loginExistingUser(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(success => {
      console.log("login success");
      goToMain();
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      debugger;
    });
}

function loginWithGoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      goToMain();
    })
    .catch(e => {
      console.error(e);
      debugger;
    });
}
