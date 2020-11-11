const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');


form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
});

function checkInputs() {
        const usernameVal = username.value.trim();
        const emailVal = email.value.trim();
        const phoneVal = phone.value.trim();
        const passwordVal = password.value.trim();
        const cpasswordVal = cpassword.value.trim();

        // for username

        usernameCheck(usernameVal);

        // for email address

        emailCheck(emailVal);

        // for phone number

        numberCheck(phoneVal);

        // for passoword

        passwordCheck(passwordVal);


        // for confirm password

        cpasswordCheck(cpasswordVal);

        // for button 

        successMessage();

}

// set error message

function setErrorMessage(input, errormsg) {
        const formControl = input.parentElement; // form control
        const small = formControl.querySelector('small');

        // add error message
        small.innerText = errormsg;

        // add error class
        formControl.className = 'form-control error';
}

// set success message

function setSuccessMessage(input) {
        const formControl = input.parentElement;
        // add success class
        formControl.className = 'form-control success';

}

// checking password

function passwordCheck(data) {

        const lowerCase = new RegExp('(?=.*[a-z])');
        const upperCase = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const specialCharacter = new RegExp('(?=.*[!@#\$%\^&\*])');
        const tenCharacter = new RegExp('(?=.{10,})');


        if (tenCharacter.test(data)) {
                setSuccessMessage(password);
                if (lowerCase.test(data)) {
                        setSuccessMessage(password);
                        if (upperCase.test(data)) {
                                setSuccessMessage(password);
                                if (number.test(data)) {
                                        setSuccessMessage(password);
                                        if (specialCharacter.test(data)) {
                                                setSuccessMessage(password);
                                        } else {
                                                setErrorMessage(password, 'password must contain special characters');
                                        }
                                } else {
                                        setErrorMessage(password, 'password must contain numbers');
                                }
                        } else {
                                setErrorMessage(password, 'password must contain uppercase letters');
                        }
                } else {
                        setErrorMessage(password, 'password must contain lowercase letters');
                }
        } else {
                setErrorMessage(password, 'There must be 10 characters for password field');
        }
}

// checking username

function usernameCheck(data) {
        if (data === ' ') {
                setErrorMessage(username, 'Username cannot be blank');
        } else if (data.length <= 4) {
                // if username length is less than 5 characters
                setErrorMessage(username, 'Username name must have 5 letters');
        } else {
                setSuccessMessage(username);
        }
}

// checking email address

function emailCheck(data) {
        const atSymbol = data.indexOf('@');
        const dot = data.lastIndexOf('.');
        if (data === ' ') {
                setErrorMessage(email, 'Email address cannot be blank');
        } else if (atSymbol < 1) {
                // means that symbol is at starting
                setErrorMessage(email, '@ symbol cannot be at the starting');
        } else if (dot <= atSymbol + 3) {
                // for example: mymail@gl.com
                // here position of dot = 9
                // atsymbol = 6
                //9 <= 6 + 3 = true

                // for example: mymail@gal.com
                // here position of dot = 10
                // atsymbol = 6
                //10 <= 6 + 3 = false
                setErrorMessage(email, 'Please add . at valid place');
        } else if (dot === data.length - 1) {
                // dot cannot be at last
                setErrorMessage(email, 'dot(.) cannot be at last position');
        } else {
                setSuccessMessage(email);
        }
}

//checking phone number

function numberCheck(data) {
        if (data === ' ') {
                setErrorMessage(data, 'phone number cannot be blank');
        } else if (!(data >= 1 && data <= 9999999999)) {
                setErrorMessage(phone, 'Please enter valid number');
        } else if (data.length !== 10) {
                // if username length is less than 5 characters
                setErrorMessage(phone, 'phone number must have 10 digits');
        } else {
                setSuccessMessage(phone);
        }
}

// Added success message

function successMessage() {
        let formCon = document.getElementsByClassName('form-control');
        var success = false;
        for (var i = 0; i < formCon.length; i++) {
                success = formCon[i].className == "form-control success";
        }
        sendData(success);
}

// Added send data 

function sendData(success) {
        if(password.value == cpassword.value) {
                if (success) {
                        swal({
                                icon: "success",
                                title: "Registration successful",
                                text: "Thank your for registration"
                              });
                } else {
                        swal({
                                icon: "error",
                                title: "Registration failed",
                                text: "Please fill all the input fields"
                              });
                }
        }else{
                swal({
                        icon: "error",
                        text: "You have changed your password,please confirm it again",
                        title: "Password Changed"
                      });
        }
}

// confirm password check

function cpasswordCheck(data) {
        if (data == "") {
                setErrorMessage(cpassword, 'confirm password cannot be blank');
        } else if (data != password.value) {
                setErrorMessage(cpassword, "passwords don't match");
        } else {
                setSuccessMessage(cpassword);
        }
}
