const firebaseConfig = {
  apiKey: 'AIzaSyC9DZtmJ_bDrC0YkOxVWF2S2jP4gpX06f8',
  authDomain: 'scenario-tool.firebaseapp.com',
  databaseURL: 'https://scenario-tool.firebaseio.com',
  projectId: 'scenario-tool',
  storageBucket: 'scenario-tool.appspot.com',
  messagingSenderId: '75545633744',
  appId: '1:75545633744:web:e1b43c7440c2290d020fd5',
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('user is signed in');
  } else {
    // No user is signed in.
    console.log('user is NOT signed in');
  }
});