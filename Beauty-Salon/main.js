
function clearPage() {
    document.getElementById("page-body").innerHTML = "";
}

function fillAbout() {
    clearPage();
    document.getElementById("page-body").className = "main-about";

    for (index in about) {
        var info = document.createElement("p");
        info.textContent = about[index];
        document.getElementById("page-body").appendChild(info);
    }
}

function fillPrices() {
    clearPage();
    document.getElementById("page-body").className = "main-prices";

    for (index in services) {
        var title = document.createElement("h3");
        title.className += "service-title";
        title.textContent = services[index].name;
        
        var area = document.createElement("div");
        area.className += "service-area";
        area.appendChild(title);

        // Specifics
        for (detailsIndex in services[index].details) {
            var name = document.createElement("h4");
            name.textContent = services[index].details[detailsIndex].name;
            var price = document.createElement("h4");
            price.textContent = services[index].details[detailsIndex].price;

            var service = document.createElement("div");
            service.className = "service-price";
            service.appendChild(name);
            service.appendChild(price);

            area.appendChild(service);
        }
        document.getElementById("page-body").appendChild(area);
    }
}

function fillAppointments() {
    clearPage();
    document.getElementById("page-body").className = "main-appointments";

    // Selected Date
    var calDate = document.createElement("div");
    calDate.className += "cal-date";
    document.getElementById("page-body").appendChild(calDate);

    // Calendar
    var calContainer = document.createElement("div");
    calContainer.className += "cal-container";
    document.getElementById("page-body").appendChild(calContainer);

    // Previous and Next Month Buttons
    var prevButton = document.createElement("input");
    prevButton.className += "cal-previous";
    prevButton.type = "button";
    prevButton.value = label.prevMonth;
    prevButton.addEventListener("click", previous_month);

    var nextButton = document.createElement("input");
    nextButton.className += "cal-next";
    nextButton.type = "button";
    nextButton.value = label.nextMonth;
    nextButton.addEventListener("click", next_month);
    
    var prevNextButtons = document.createElement("div");
    prevNextButtons.className = "cal-buttons";
    prevNextButtons.appendChild(prevButton);
    prevNextButtons.appendChild(nextButton);

    document.getElementById("page-body").appendChild(prevNextButtons);

    // Event
    var calEvent = document.createElement("div");
    calEvent.className += "cal-event";
    document.getElementById("page-body").appendChild(calEvent);
    list();
}

function fillAccount() {
    clearPage();

    if (currentUserId == null) {
        document.getElementById("page-body").className = "main-login";

        // Error Text
        var errorTitle = document.createElement("h3");
        errorTitle.textContent = account.errorTitle;

        var errorSubtitle = document.createElement("h4");
        errorSubtitle.textContent = account.errorSubtitle;

        var errorText = document.createElement("div");
        errorText.appendChild(errorTitle);
        errorText.appendChild(errorSubtitle);
        
        document.getElementById("page-body").appendChild(errorText);
        
        // Error Buttons
        var registerButton = document.createElement("button");
        registerButton.className += "login-button";
        registerButton.addEventListener("click", fillRegister);
        registerButton.textContent = register.title;

        var loginButton = document.createElement("button");
        loginButton.className += "login-button";
        loginButton.addEventListener("click", fillLogin);
        loginButton.textContent = login.title;
        
        var upsButtons = document.createElement("div");
        upsButtons.appendChild(registerButton);
        upsButtons.appendChild(loginButton);
        
        document.getElementById("page-body").appendChild(upsButtons);
    } else {
        document.getElementById("page-body").className = "main-account";
        fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                showAppointments(users[currentUserId]);
            });
        });
        fillUserInfo();
    }
}

function fillUserInfo() {
    if (currentUserId != null && document.getElementById("user-name") == null) {
        fetch('http://localhost:3000/users')
        .then(function (response) {
            response.json().then(function (users) {
                var userName = document.createElement("h5");
                userName.id = "user-name";
                userName.textContent = user.message + ", " + users[currentUserId].name + "!";
                document.getElementById("user-info").appendChild(userName);

                var logoutButton = document.createElement("button");
                logoutButton.addEventListener("click", function() {
                    currentUserId = null;
                    document.getElementById("user-info").innerHTML = "";
                    fillAbout();
                });
                logoutButton.id = "logout";
                logoutButton.textContent = nav.logout;
                document.getElementById("user-info").appendChild(logoutButton);
            });
        });
    }
}

window.addEventListener("load", function () {
    // Fill Header
    document.getElementById("logo").src = nav.logo_url;

    // Fill Nav
    var prices = document.getElementsByClassName("prices")[0];
    prices.addEventListener("click", fillPrices);
    prices.textContent = nav.prices;

    var account = document.getElementsByClassName("account")[0];
    account.addEventListener("click", fillAccount);
    account.textContent = nav.account;

    var appointments = document.getElementsByClassName("appointments")[0];
    appointments.addEventListener("click", fillAppointments);
    appointments.textContent = nav.appointments;

    var about = document.getElementsByClassName("about")[0];
    about.addEventListener("click", fillAbout);
    about.textContent = nav.about;

    // Fill Footer
    // Schedule
    footerInfo = document.getElementsByClassName("contact-info");
    for (index in footer.schedule) {
        var schedule = document.createElement("h5");
        schedule.className += "footer";
        schedule.textContent = footer.schedule[index];
        footerInfo[0].appendChild(schedule);
    }
    
    // Adress
    var adress = document.createElement("h5");
    adress.className += "footer";
    adress.textContent = footer.adress;
    footerInfo[1].appendChild(adress);

    //Contact
    var phone = document.createElement("h5");
    phone.className += "footer";
    phone.textContent = footer.phone;
    footerInfo[2].appendChild(phone);

    var email = document.createElement("h5");
    email.className += "footer";
    email.textContent = footer.email;
    footerInfo[2].appendChild(email);

    fillAbout();
    fillUserInfo();
});
