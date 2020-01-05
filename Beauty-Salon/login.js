
function checkValidUser(users) {
    var userPassword = document.getElementsByClassName("password")[0].value;
    var userEmail = document.getElementsByClassName("email")[0].value;
    
    for (var i = 0; i < users.length; i ++) {
        if (users[i].email == userEmail && users[i].password == userPassword) {
            currentUserId = i;
            fillAccount();
            return ;
        }
    }
    
    if (document.getElementsByClassName("error-message")[0] == null) {
        errorMessage = document.createElement("p");
        errorMessage.className += "error-message";
        errorMessage.textContent = login.error;
        document.getElementsByClassName("form")[0].appendChild(errorMessage);
    }
}

function fillLogin() {
    clearPage();
    document.getElementById("page-body").className = "register-login";

    // Login Title
    var title = document.createElement("h3");
    title.textContent = login.title;

    // Login Email
    var emailLabel = document.createElement("label");
    emailLabel.htmlFor = "email";
    emailLabel.textContent = label.email;
    var emailInput = document.createElement("input");
    emailInput.className += "email";
    emailInput.type = "email";
    emailInput.placeholder = label.emailPlaceholder;
    emailLabel.appendChild(emailInput);

    // Login Password
    var passwordLabel = document.createElement("label");
    passwordLabel.htmlFor = "password";
    passwordLabel.textContent = label.password;
    var passwordInput = document.createElement("input");
    passwordInput.className += "password";
    passwordInput.type = "password";
    passwordInput.required = true;
    passwordLabel.appendChild(passwordInput);

    // Login Button
    var submit = document.createElement("button");
    submit.className += "submit";
    submit.type = "submit";
    submit.textContent = login.button;

    var form = document.createElement("form");
    form.addEventListener("submit", function(event) {
        fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                checkValidUser(users);
            });
        });

        event.preventDefault();
    });

    form.className += "form";
    form.appendChild(title);
    form.appendChild(emailLabel);
    form.appendChild(passwordLabel);
    form.appendChild(submit);

    document.getElementById("page-body").appendChild(form);
}
