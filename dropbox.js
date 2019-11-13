/*********************************
* Author: Leonid Uvarov
* Create a dropbox saver button with an array of URL's
* App name is: customAppImagesVal
* Access token: H0PjyUNiDOAAAAAAAAAANkYqGqzNZk0gVL7cMfsYIUpY_vLbUyCvydu5EsfT8Cb2
* ******************************/
var ACCESS_TOKEN = "H0PjyUNiDOAAAAAAAAAANzY6Hao3nZxDZugz96ibd7lLIVIWXavSm9-336kSRhf6";
var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN }); // For leonid@buildinglink.com
var options = {
  files: [{"url": "https://www.buildinglink.com/Modules/Marketing/Public/images/main/carsonlogo.png", "filename": "carson.png"}],

  // Success is called once all files have been successfully added to the user's
  // Dropbox, although they may not have synced to the user's devices yet.
  success: function () {
      // Indicate to the user that the files have been saved.
      console.log("Success! Files saved to your Dropbox.");
  },

  // Progress is called periodically to update the application on the progress
  // of the user's downloads. The value passed to this callback is a float
  // between 0 and 1. The progress callback is guaranteed to be called at least
  // once with the value 1.
  progress: function (progress) {},

  // Cancel is called if the user presses the Cancel button or closes the Saver.
  cancel: function () {},

  // Error is called in the event of an unexpected response from the server
  // hosting the files, such as not being able to find a file. This callback is
  // also called if there is an error on Dropbox or if the user is over quota.
  error: function (errorMessage) {}
};

// Create a folder 
// Takes name - as String value
function createFolder(name) {
  dbx.filesCreateFolderV2({path: '/' + name})
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
  });
}

// Dynamically created dropbox button
// Button to download files specified from options obj
function createDropBoxBtn() {
  var button = Dropbox.createSaveButton(options);
  document.getElementById("dropbox-btn").innerHTML = "";
  document.getElementById("dropbox-btn").appendChild(button);
}

// Creates folder and file structure in a given Dropbox account
// Fires when "Send to BuildingLink" button clicked

