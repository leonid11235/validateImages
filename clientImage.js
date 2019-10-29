// This script file handles functions related to images (client side)
// NOTE: This page should be refactor for debugging, readability reasons but works for now.

function selectImg(imgDomId, wrapperId, valHeight, valWidth) {
    var wrapper = document.getElementById(wrapperId);
    var preview = document.getElementById(imgDomId);//selects the query named img
    var file    = wrapper.querySelector('input[type=file]').files[0];
    var errorText = wrapper.querySelector(".img-val-error");
    var successText = wrapper.querySelector(".img-val-success");
    var name    = wrapperId;
    var namePng = name + ".png";
    var fileInputId = wrapperId + "-input";
    var reader  = new FileReader();
    
    reader.onload = function (e) {
  
        //Initiate the JavaScript Image object.
        var image = new Image();
        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
  
        // validateImgDim(this.width, this.height, width, height, size, this.size);
        var height = this.height;
        var width = this.width;
        if (height > valHeight || width > valWidth) {
            // If image does not pass dimension validation
            $('#' + fileInputId).addClass("invalid-image-underline");
            preview.src = reader.result;
            errorText.style.display = "block";
            successText.style.display = "none";

            return false;
        } else {
            // If image does pass dimension validation
            console.log("Uploaded image has valid Height and Width.");
            localFiles.push({"url": file, "name": namePng});
            preview.src = reader.result;
            successText.style.display = "block";
            errorText.style.display = "none";

            if (document.getElementById(fileInputId).classList.contains("invalid-image-underline")) {
                document.getElementById(fileInputId).classList.remove("invalid-image-underline");
            }
        }
  
        return true;
      };
    }

    file ? reader.readAsDataURL(file) : preview.src = "";
}

// Pass the function parameters to check against, return false if fails
// Checks dimensions of client side image
// Note: should be text on page, not alert
function validateImgDim(width, height, valWidth, valHeight) {

}

/* Clears the current img selected and any validation present in the UI */
function clearInput() {

}

/*  */
function validateImgFileSize(size, valSize) {
    // If fle size > 1mb
    // show error
    // else, continue
}

// Function to validate file type
function validateImgFile(fileId){
    var fileInput = document.getElementById(fileId);
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        console.log('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    } else {
      return true;
    }
}

// Function calls img validation sub routines
// function validateImg() {
//     validateImgFile();
//     validateImgSize();
// }