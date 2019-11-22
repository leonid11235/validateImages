// Handles Firebase Database functions

var db = firebase.firestore();

function writeUserData(username, useremail, usertype) {
    db.collection("users").add({
        name: username,
        email: useremail,
        type: usertype
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        M.toast({html: 'New User Successfully Created! <i class="far fa-check-circle"></i>'});
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}