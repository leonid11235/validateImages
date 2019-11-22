// Files used by validation form pages

formsInit();

function formsInit() {
    getBlgNamefromFB();
}

// Get the building name from db
function getBlgNamefromFB() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            var email = firebaseUser.email;
            db.collection("users").get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    if (doc.data().email === email) {
                        displayBlgName(doc.data().name);               
                    }     
                })
            })
        } else {
            console.log("not logged in");
        }
    });
}

function displayBlgName(name) {
    $('#blg-name').html(name);
}