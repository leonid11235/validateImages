/*********************************
*  Author: Leonid Uvarov
*  File handles signup functionality
* ******************************/
var name = "";
var email = "";
var password = "";
var type = "";

function createUserBtn() {
    name = $('#blg_name').val();
    email = $('#email').val();
    password = $('#password').val();
    type = $("input[name='type-radio']:checked").val();

    // This system must be redone. Create a function to return true or false.
    // Separate Firebase functions and slient side functionality
    createNewUser(email, password, type, name);

    $('#blg_name').val("");
    $('#email').val("");
    $('#password').val("");
}