/*********************************
* Author: Leonid Uvarov
* Create a dropbox saver button with an array of URL's
* App name is: customAppImagesVal
* Access token: H0PjyUNiDOAAAAAAAAAANkYqGqzNZk0gVL7cMfsYIUpY_vLbUyCvydu5EsfT8Cb2
* ******************************/
var dbx = new Dropbox_SDK.Dropbox({ accessToken: "H0PjyUNiDOAAAAAAAAAAOz3fL1cJqNncni8zJyflAgktYfFKVahaDACZ5Yw7K9o9" });
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

// // Create a folder 
// Takes name - as String value
function createBuildingFolder(blgName) {
  dbx.filesCreateFolderV2({path: '/'+ blgName})
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
  });
}

function createSectFolder(blgName, sectName) {
  dbx.filesCreateFolderV2({path: '/'+ blgName + '/' + sectName})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
}

// Dynamically created dropbox button
// Button to download files specified from options obj
function createDropBoxBtn() {
  var button = Dropbox_v1.createSaveButton(options);
  document.getElementById("dropbox-btn").innerHTML = "";
  document.getElementById("dropbox-btn").appendChild(button);
}

// Creates folder and file structure in a given Dropbox account
// Fires when "Send to BuildingLink" button clicked
function saveToBlkDropbox() {
  var valid = true;
  // Create building folder
  createBuildingFolder(blgName);
  // Create section folders
  //createSectFolder(blgName, "Batch-Files");
  
  setTimeout(function () {
      createSectFolder(blgName, "App-Icon");
  }, 5000);

  setTimeout(function () {
    createSectFolder(blgName, "Batch-Files");
  }, 5000);


  // createSectFolder(blgName, "Meta-data");
  // Add images to section folders
  // Redirect to success page, logout user
  if (valid)
    var temp = 1;
    // window.location.replace("http://localhost:5500/success.html")
  else
    alert("An error occured, please refresh the page and try again");
  // Use sendGrid to send email notification to support
}
