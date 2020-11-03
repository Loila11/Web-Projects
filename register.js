
function addUser(users) {
    var user = {
        name: document.getElementsByClassName("name")[0].value,
        password: document.getElementsByClassName("password")[0].value,
        email: document.getElementsByClassName("email")[0].value,
        appointments: []
    }

    fetch('http://localhost:3000/users', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(function() {
        currentUserId = users.length;
        alert(register.succes);
        fillAccount();
    })
}

function fillRegister() {
    clearPage();
    document.getElementById("page-body").className = "register-login";

    // Register Title
    var title = document.createElement("h3");
    title.textContent = register.title;

    // Register Name
    var nameLabel = document.createElement("label");
    nameLabel.htmlFor = "name";
    nameLabel.textContent = label.name;
    var nameInput = document.createElement("input");
    nameInput.className += "name";
    nameInput.type = "text";
    nameInput.required.minLength = "2";
    nameInput.placeholder = label.namePlaceholder;
    nameInput.required = true;
    nameLabel.appendChild(nameInput);

    // Register Email
    var emailLabel = document.createElement("label");
    emailLabel.htmlFor = "email";
    emailLabel.textContent = label.email;
    var emailInput = document.createElement("input");
    emailInput.className += "email";
    emailInput.type = "email";
    emailInput.required = true;
    emailInput.placeholder = label.emailPlaceholder;
    emailLabel.appendChild(emailInput);

    // Register Phone Number
    var numberLabel = document.createElement("label");
    numberLabel.htmlFor = "number";
    numberLabel.textContent = label.number;
    var numberInput = document.createElement("input");
    numberInput.className += "number";
    numberInput.type = "number";
    numberInput.pattern = "07.{10,15}";
    numberInput.placeholder = label.numberPlaceholder;
    numberLabel.appendChild(numberInput);

    // Register Password
    var passwordLabel = document.createElement("label");
    passwordLabel.htmlFor = "password";
    passwordLabel.textContent = label.password;
    var passwordInput = document.createElement("input");
    passwordInput.className += "password";
    passwordInput.type = "password";
    passwordInput.required = true;
    passwordLabel.appendChild(passwordInput);

    // Register Button
    var submit = document.createElement("button");
    submit.className += "submit";
    submit.type = "submit";
    submit.textContent = register.button;

    var form = document.createElement("form");
    form.addEventListener("submit", function(event) {
        fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                var userEmail = document.getElementsByClassName("email")[0];
                for (var i = 0; i < users.length; i ++) {
                    if (users[i].email == userEmail.value) {
                        alert(register.error);
                        return ;
                    }
                }
                addUser(users);
            });
        });

        event.preventDefault();
    });
    form.className += "form";
    form.appendChild(title);
    form.appendChild(nameLabel);
    form.appendChild(emailLabel);
    form.appendChild(numberLabel);
    form.appendChild(passwordLabel);
    form.appendChild(submit);

    document.getElementById("page-body").appendChild(form);
}
