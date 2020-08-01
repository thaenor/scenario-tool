const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('user is signed in');
  } else {
    // No user is signed in.
    alert(MESSAGES.lack_of_permissions);
    window.location.replace(ROUTES.auth);
  }
});
