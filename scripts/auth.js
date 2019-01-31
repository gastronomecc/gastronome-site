var database = firebase.database();

/* FIREBASE AUTHENTICATION */
/* SIGN IN SIGN OUT */
function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START SIGNOUT]
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            window.location.href = "index.html";
        }, function(error) {
            console.error('Sign Out Error', error);
        });
        // [END SIGNOUT]
      } else {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email.length < 4) {
              alert('Please enter an email address.');
              return;
            }
            if (password.length < 4) {
              alert('Please enter a password.');
              return;
            }

        // SIGN IN WITH EMAIL AND PASS
        // [START AUTHENTICATION WITH EMAIL]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('register').disabled = false;
            // [END_EXCLUDE]
        });
        // [END AUTHENTICATION WITH EMAIL]
    }
    // document.getElementById('register').disabled = true;
}


function redirect() {
    document.getElementsById('register').addEventListener("click", redirect, false);
}

/* HANDLES SIGN OUT */
function handleSignOut() {
    // if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.href = "index.html";
    }, function(error) {
        console.error('Sign Out Error', error);
    });
    // [END signout]
}


/* SIGN UP WITH EMAIL AND PASSWORD */
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
  // [END createwithemail]

    function sendEmailVerification() {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
            // [START_EXCLUDE]
            alert('Email Verification Sent!');
            // [END_EXCLUDE]
        });
      // [END sendemailverification]
    }

    function sendPasswordReset() {
        var email = document.getElementById('email').value;
        // [START sendpasswordemail]
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            // Password Reset Email Sent!
            // [START_EXCLUDE]
            alert('Password Reset Email Sent!');
            // [END_EXCLUDE]
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/invalid-email') {
              alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
              alert(errorMessage);
            }
            console.log(error);
        // [END_EXCLUDE]
        });
      // [END sendpasswordemail];
    }
}


/* INIT APP TO SET UP EVENT LISTENERS AND REGISTER FIREBASE AUTH LISTENERS -- firebase.auth().onAuthStateChanged
Called when the user is signed in or out. */
function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var name = user.name;
            var email = user.email;

            console.log("Logged in");
            // window.location = "home.html";
        }
        else {
            console.log("Not logged in");
        }
    });

    // [END authstatelistener]
    var el = document.getElementById('sign-in');
    var el2 = document.getElementById('sign-up');
    var el3 = document.getElementById('sign-out');

    if (el) {
        document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
    }
    if (el2) {
        document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
    }
    if (el3) {
        document.getElementById('sign-out').addEventListener('click', handleSignOut, false);
    }
    
    // document.getElementById('verify-email').addEventListener('click', sendEmailVerification, false);
    // document.getElementById('password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
    initApp();
};

/* FIREBASE DATABASE */
function writeUserData() {
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;

    firebase.database().ref('Users/').push({
        email: email,
        name: name
    });
}

function updateUserData() { // for edit
    var name = document.getElementById('name').value;

    firebase.database().ref('Users/' + user.uid).update({
        username: name,
    });
}