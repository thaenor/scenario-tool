var signInBtn = document.getElementById('signInBtn');
var loginBtn = document.getElementById('loginBtn');
var errorMessageLabel = document.getElementById('login-error-message');
var signInGoogleBtn = document.getElementById('signInGoogleBtn');
var emailFormField = document.getElementById('login-form-email');
var passwordFormField = document.getElementById('login-form-password');

$('#logoutBtn').click((e) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log('Sign-out successful.');
    })
    .catch(function (error) {
      console.error(error);
      alert('An error happened.');
    });
});

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

// Helper functions
function getEmail() {
  return passwordFormField.value;
}

function getPassword() {
  return emailFormField.value;
}

function goToMain() {
  window.location.replace('/main');
}

function storeUserData(string_json_data) {
  localStorage.clear();
  localStorage.setItem('user_data', string_json_data);
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
    .then((success) => {
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
    .then((success) => {
      storeUserData(JSON.stringify(success.user));
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
      localStorage.setItem('GoogleAccessToken', result.credential.accessToken);
      goToMain();
    })
    .catch((error) => {
      displayErrorMessage(error.message);
      clearForm();
    });
}
