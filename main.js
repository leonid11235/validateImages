/*********************************
*  Author: Leonid Uvarov
*  General client side logic
* ******************************/

// Global variables
const $blgNameDom = $('#blg-name-area');
var blgName = "Name";
// Array to store local file url's
var localFiles =  [];
var firebaseUrls= [];
var optionsModal = {
  "dismissible": false
};

/*********************************
*  INPUT HANDLING
********************************/
function getBlgNameTxt() {
  return $blgNameDom.val().replace(/\s/g, '');
}

function validateInputOnSubm() {
  if (blgName !== "" && localFiles.length > 0)
    return true;
  else
    return false; 
}

/*********************************
*  FIREBASE FUNCTIONS
* ******************************/

// This funcion does 3 separate things and should be split up
function uploadToFirebase(image, name){
  var storageRef = firebase.storage().ref('images/' + blgName + "/"+ name);
  storageRef.put(image).then(function(snapshot){
    storageRef.getDownloadURL().then(function(url) {
      var obj = {
        "url": url,
        "filename": name
      };
      options.files.push(obj);
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

function errorToScreen(message, selectorID) {
  $('#' + selectorID).html(message)
  $('#' + selectorID).show();
}


// Temporary func: set the URL for dropbox button (image to save)
function setDBUrl(url) {
  $('#dropbox-saver-id').attr('href', url);
}

/*********************************
 *  MATERIALIZE UI/ MODALS
 * *******************************/

/*********************************
 *  EVENT LISTENERS
 * *******************************/

// Execute when DOM loads
$(document).ready(function () {
  $('img').on('click', function () {
    var image = $(this).attr('src');
    $('#myModal').on('show.bs.modal', function () {
      $(".img-responsive").attr("src", image);
    });
  });
  init();
});

// Run function when page loads
function init() {
  checkCredentials();
}

// Fires when user clicks "Save" in modal-blg
function saveBlgName() {
  if ($blgNameDom.val().replace(/\s/g, '') !== "") {
    blgName = $blgNameDom.val().replace(/\s/g, '').trim();
    $('#modal-blg').modal('close');
    $('#blg-name').html(blgName);
  } else {
    errorToScreen("Please enter a building name", "modal-blg-name-error");
  }
}

// When user clicks "Submit files"
function submitBtn() { 
  var noError = validateInputOnSubm();
  if (noError) {
    for (var i = 0; i < localFiles.length; i++) {
      uploadToFirebase(localFiles[i].url, localFiles[i].name);
    }
    $('#modal1').modal('open');  
    console.log(options);
    // createDropBoxBtn(); ** Cant use with Dropbox API V2
  } else {
    errorToScreen("Unable to submit, make sure a file is selected", "img-not-slt-error");
  } 
}

var isDirty = function() { return false; } 

window.onload = function() {
    window.addEventListener("beforeunload", function (e) {
        if (formSubmitting || !isDirty()) {
            return undefined;
        }

        var confirmationMessage = 'It looks like you have been editing something. '
                                + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
};