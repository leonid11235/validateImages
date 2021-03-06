/*********************************
*  Author: Leonid Uvarov
*  This JS file handles functions related to images (client side)
* ******************************/
// NOTE: This page should be refactor for debugging, readability reasons but works for now.

var filesList = [];

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
    var removeIndex = 0;
    
    reader.onload = function (e) {
  
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {

            // validateImgDim(this.width, this.height, width, height, size, this.size);
            var height = this.height;
            var width = this.width;
            if (height > valHeight || width > valWidth) {
                // If image does not pass dimension validation
                removeIndex = localFiles.map(function(item) { return item.name; }).indexOf(namePng);
                localFiles.splice(removeIndex, 1);
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
                filesList.push(file); // ??
                console.log(filesList);

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
