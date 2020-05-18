var userData = localStorage.getItem('user_data');

var target = userData ? "main" : "auth";

window.location.replace(target);