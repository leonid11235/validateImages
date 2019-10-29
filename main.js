// Author: Leonid Uvarov
// NOTES: Create function for validateDimensions, separate firebase .js file?

// Global variables
  
// Array to store local file url's
localFiles =  [

];

// Creates a dropbox button 
function submitBtn() { 
  var containsError = true;

  if (!containsError) {
    // Upload array of local URL's to Firebase
    uploadToFirebaseLoop();
    console.log("Submit button clicked");
    createDropBoxBtn();
  } else {
    alert("Unable to submit");
  }
  
}

/*********************************
 *  FIREBASE FUNCTIONS
 * ******************************/

function uploadToFirebase(image, name){
  // Create a storage reference
  var storageRef = firebase.storage().ref('images/' + name);
  // Upload file - 
  var task = storageRef.put(image);
  var errorOccured = false;

  task.on('state_changed', 
    function progress(snapshot) {console.log("successfully uploaded image to Firebase")},
    function error(err) {
      errorOccured = true;
    },
    function complete() {}
  )
}

// Upload all files in array to Google Firebase Storage
function uploadToFirebaseLoop() {

  for (var i = 0; i < localFiles.length; i++) {
    console.log("file: " + localFiles[i].url);
    uploadToFirebase(localFiles[i].url, localFiles[i].name);
  }
}

/*********************************
 *  BROPBOX FUNCTIONS
 * ******************************/

function loadDropboxURLs() {
  for (var i = 0; i < localFiles.length; i++ ) {
    alert(localFiles[0].name);
    alert(getFirebaseImgUrl(localFiles[0].name));
    options.files[i].url = getFirebaseImgUrl(localFiles[i].name);
    options.files[i].name =  localFiles[i].name;
  }
}

// Get the image URL from the server stored on Firebase firestore
// Parameter: Takes the unique name of the image
function getFirebaseImgUrl(name) {
  var storageRef = firebase.storage().ref('images/' + name);
  storageRef.getDownloadURL().then(function(url) {
    alert("firebase: " + url);
    return url;
  }).catch(function(error) {
    switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      console.log("File doesn't exist")
      return false;
      break;
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      console.log("User doesn't have permission to access the object")
      return false;
      break;
    case 'storage/canceled':
      // User canceled the upload
      console.log("User canceled the upload")
      return false;
      break;
    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      console.log("Unknown error occurred, inspect the server response");
      return false;
      break;
    }
  });
}

// Update UI on validation
// Pass a 0 or 1 state, 
function updateUIVal(state, selector, errorMsg, succMsg) {
  var $el = $('#' + selector);
  if (state) {
    // Show success prompt
    $el.html("Success!");
    $el.addClass("imgSuccess");
    $el.removeClass("imgFail");
  } 
    // Show failed prompt
    $el.html("Failed: Check requirements above");
    $el.addClass("imgFail");
    $el.removeClass("imgSuccess");
}

document.onload = function() {
  // Adjust height for overflown labels on mobile
  if ($('.overflown')[0].scrollWidth >  $('.overflown').innerWidth()) {
    $('.overflown')[0].attr('height', 'auto')
  }
}

/*********************************
 *  UTILS
 * ******************************/

/**
   * Creates a string that can be used for dynamic id attributes
   * Example: "id-so7567s1pcpojemi"
   * @returns {string}
*/
function uniqueNumber() {
  return 'id-' + Math.random().toString(36).substr(2, 16);
}

function createName(str) {
  newStr = str.replace(/-/g, "");
  return newStr;
}

// Temporary func: set the URL for dropbox button (image to save)
function setDBUrl(url) {
  $('#dropbox-saver-id').attr('href', url);
}

/*********************************
 *  EVENT LISTENERS
 * *******************************/

$(document).ready(function () {
    $('img').on('click', function () {
        var image = $(this).attr('src');
        $('#myModal').on('show.bs.modal', function () {
            $(".img-responsive").attr("src", image);
        });
    });
});
