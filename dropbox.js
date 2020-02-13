/*********************************
* Author: Leonid Uvarov
* App name is: customAppImagesVal
* ******************************/
var token = "H0PjyUNiDOAAAAAAAAAAPYFoxSC1-T8eOPzVQ15J0U8dlgegwj6t6NcgQACydZTa"
var dbx = new Dropbox.Dropbox({ accessToken: token })

// Array holds images to 
var args = []

// Object holds folder names
const folderNames = {
  appIcon: 'App Icon',
  splashScreen: 'Splash Screen',
  login: 'Login',
  metadata: 'Metadata'
}

const data = [
  {
    name: '',
    folder: ''
  }
]

// Get user info
function getUserInfo() {
  alert();
  dbx.usersGetCurrentAccount()
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.error(error)
  })
}

// Create folder structure
const createFolders = () => {
  dbx.filesCreateFolderBatch({
    paths: [
      '/' + app.blgName, 
      '/' + app.blgName + '/' + folderNames.appIcon, 
      '/' + app.blgName + '/' + folderNames.splashScreen, 
      '/' + app.blgName + '/' + folderNames.login, 
      '/' + app.blgName + '/' + folderNames.metadata
    ]
  })
}

// Upload image to specific folder
const uploadToFolderParam = (pathParam, urlParam) => {
  dbx.filesSaveUrl({path: pathParam, url: urlParam})
}

// Creates folder and file structure in a given Dropbox account
// Fires when "Send to BuildingLink" button clicked
function saveToBlkDropbox() {
  // Create building folder
  createFolders()
  firebaseUrls.forEach(function(obj, index) {
    const folderName = folderNames.appIcon
    uploadToFolderParam('/' + app.blgName + '/'+ folderName + '/' + obj.filename, obj.url)
  })
}

// Creates a new text file in Dropbox
// Reference: https://blogs.dropbox.com/developers/2013/12/writing-a-file-with-the-dropbox-javascript-sdk/
function dropboxTxt() {
  dbx.writeFile('hello.txt', 'Hello, World!', function () {
        alert('File written!')
  });
}