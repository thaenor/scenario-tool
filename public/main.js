firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("user is signed in");
    } else {
        // No user is signed in.
        console.log("user is NOT signed in");
    }
});

var userData = localStorage.getItem('user_data');

var target = userData ? "main" : "auth";

window.location.replace(target);