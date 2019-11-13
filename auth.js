/*********************************
*  Author: Leonid Uvarov
*  File handles Firebase Authentications
* ******************************/

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const $btnLogOut = $('.btn-logout');

// Login event
btnLogin.addEventListener('click', e => {
    console.log('login attempted');
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (!errorMessage) {
            console.log("Login Successful");
            window.location.replace("http://localhost:5500/landing-page.html")
        }
        else {
            errorToScreenAuth(errorMessage, "login-error");
        }
      });
      auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            window.location.replace("http://localhost:5500/landing-page.html")
        } else {
            console.log("not logged in");
        }
    });
});

// Logout button 
$btnLogOut.click(function() {
    firebase.auth().signOut();
    window.location.replace("http://localhost:5500/login.html")
});

// Realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log("not logged in");
    }
});

// If an email and password are not given, redirect to login page
function checkCredentials() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            authShowBody();
            $('.sidenav').sidenav();
            $('.modal-dropbox').modal();
            $('.modal-blg').modal(optionsModal);
            $('#modal-blg').modal('open'); 
        } else {
            console.log("not logged in");
            window.location.replace("http://localhost:5500/login.html")
        }
    });
}

// Returns boolean if user has correct credentials
function isCredentials() {
    alert("isCredentials function called...");
    firebase.auth().onAuthStateChanged(firebaseUser => {
        alert(firebaseUser);
        return firebaseUser ? true : false;
    });
}

// If authentication succeeds, show markup content
function authShowBody() {
    $('body').show();
}

// If authentication fails, redirect to login page
function authRedirect() {
    window.location.replace("http://localhost:5500/login.html")
}

function errorToScreenAuth(message, selectorID) {
    $('#' + selectorID).html(message)
    $('#' + selectorID).show();
}
  
