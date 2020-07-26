const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('user is signed in');
  } else {
    // No user is signed in.
    console.log('user is NOT signed in');
    alert("you don't have permissions to view this page");
    window.location.replace('/auth');
  }
});
