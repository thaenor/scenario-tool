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
var errorMessageLabel = document.getElementById('login-error-message');
var signInGoogleBtn = document.getElementById("signInGoogleBtn");
var emailFormField = document.getElementById("login-form-email");
var passwordFormField = document.getElementById("login-form-password");

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
  clearErrorMessage();
  createNewUser(getEmail(), getPassword());
});
loginBtn.addEventListener("click", e => {
  clearErrorMessage();
  loginExistingUser(getEmail(), getPassword());
});
signInGoogleBtn.addEventListener("click", e => {
  clearErrorMessage();
  loginWithGoogle();
});

// Helper functions
function getEmail() {
  return passwordFormField.value;
}

function getPassword() {
  return emailFormField.value;
}

function goToMain() {
  window.location.replace("/main");
}

function storeUserData(string_json_data) {
  localStorage.clear();
  localStorage.setItem('user_data', string_json_data);
}

function displayErrorMessage(message) {
  errorMessageLabel.append(message);
}

function clearErrorMessage() {
  errorMessageLabel.innerHTML = "";
}

function clearForm() {
  emailFormField.value = '';
  passwordFormField.value = '';
}

// Firebase stuff
function createNewUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(success => {
      storeUserData(JSON.stringify(success.user));
      clearForm();
      goToMain();
    })
    .catch(function (error) {
      displayErrorMessage(error.message);
      clearForm();
    });
}

function loginExistingUser(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(success => {
      storeUserData(JSON.stringify(success.user))
      goToMain();
    })
    .catch(function (error) {
      displayErrorMessage(error.message);
      clearForm();
    });
}

/**
 * Data received in the payload
 * user.displayName
 * user.email
 * user.emailVerified
 * user.photoURL
 * user.isAnonymous
 * user.uid
 * user.providerData;
 */
function loginWithGoogle() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      var user = JSON.stringify(result.user);
      localStorage.setItem('user_data', user);
      localStorage.setItem('GoogleAccessToken',result.credential.accessToken);
      goToMain();
    })
    .catch(error => {
      displayErrorMessage(error.message);
      clearForm();
    });
}