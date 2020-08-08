let signInBtn = document.getElementById('signInBtn');
let loginBtn = document.getElementById('loginBtn');
let errorMessageLabel = document.getElementById('login-error-message');
let signInGoogleBtn = document.getElementById('signInGoogleBtn');
let emailFormField = document.getElementById('login-form-email');
let passwordFormField = document.getElementById('login-form-password');
let resetPassword = document.getElementById('reset-password');

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = 'pt';
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({
  login_hint: 'user@example.com',
});

// Register Events
signInBtn.addEventListener('click', (e) => {
  clearErrorMessage();
  createNewUser(getEmail(), getPassword());
});
loginBtn.addEventListener('click', (e) => {
  clearErrorMessage();
  loginExistingUser(getEmail(), getPassword());
});
signInGoogleBtn.addEventListener('click', (e) => {
  clearErrorMessage();
  loginWithGoogle();
});
resetPassword.addEventListener('click', (e) => {
  e.preventDefault();
  resetUserPassword(getEmail());
});

// Helper functions
function getEmail() {
  return emailFormField.value;
}

function getPassword() {
  return passwordFormField.value;
}

function goToMain() {
  window.location.replace(ROUTES.main);
}

function storeUserData(string_json_data) {
  localStorage.clear();
  localStorage.setItem(STORAGE.user_name, string_json_data);
}

function displayErrorMessage(message) {
  errorMessageLabel.append(message);
}

function clearErrorMessage() {
  errorMessageLabel.innerHTML = '';
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
    .then(() => {
      storeUserData(JSON.stringify(getEmail()));
      clearForm();
      goToMain();
    })
    .catch(function (error) {
      displayErrorMessage(error.message);
      console.error(error);
      clearForm();
    });
}

function loginExistingUser(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      storeUserData(getEmail());
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
      localStorage.setItem(STORAGE.user_name, result.user.displayName);
      goToMain();
    })
    .catch((error) => {
      console.error(error);
      displayErrorMessage(error.message);
      clearForm();
    });
}

function resetUserPassword(emailAddress) {
  if (emailAddress.length === 0) {
    alert(MESSAGES.email_reset_fill_email);
  } else {
    firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        alert(MESSAGES.password_reset_sent);
      })
      .catch(function (error) {
        alert(`${MESSAGES.general_error} - ${error.message}`);
      });
  }
}
