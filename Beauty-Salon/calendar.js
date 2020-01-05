
function list() {
    var calDate = document.getElementsByClassName("cal-date")[0];
    calDate.innerHTML = "";
    var calMonth = document.createElement("h2");
    calMonth.textContent = monthNames[date.month];
    calMonth.className += "cal-mth";
    var calYear = document.createElement("h2");
    calYear.textContent = date.year;
    calYear.className += "cal-yr";
    calDate.appendChild(calMonth);
    calDate.appendChild(calYear);

    var daysInMth = new Date(date.year, date.month + 1, 0).getDate(),
        startDay = new Date(date.year, date.month, 1).getDay(),
        endDay = new Date(date.year, date.month, daysInMth).getDay();

    var data = localStorage.getItem("cal-" + date.month + "-" + date.year);
    if (data == null) {
        localStorage.setItem("cal-" + date.month + "-" + date.year, "{}");
        data = {};
    } else {
        data = JSON.parse(data);
    }

    var squares = [];
    var blanks = (startDay + 6) % 7;
    for (var i = 0; i < blanks; i ++) { 
        squares.push("b");
    }

    for (var i = 0; i < daysInMth; i ++) { 
        squares.push(i + 1); 
    }

    blanks = (7 - endDay) % 7;
    for (var i = 0; i < blanks; i ++) { 
        squares.push("b"); 
    }

    var container = document.getElementsByClassName("cal-container")[0],
        cTable = document.createElement("table");
    cTable.className += "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    // First row - Week days
    var cRow = document.createElement("tr"),
        cCell = null;
    for (var day of daysInfo) {
        cCell = document.createElement("td");
        cCell.innerHTML = day.name;
        cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    // Month days
    var total = squares.length;
    cRow = document.createElement("tr");
    cRow.classList.add("day");
    for (var i = 0; i < total; i ++) {
        cCell = document.createElement("td");
        if (squares[i] == "b") { 
            cCell.classList.add("blank"); 
        } else {
            var cell = document.createElement("div");
            cell.classList.add("dd");
            cell.textContent = squares[i];
            cCell.appendChild(cell);
            if (data[squares[i]]) {
                var event = document.createElement("div");
                event.classList.add("evt");
                event.textContent = data[squares[i]];
                cCell.appendChild(event);
            }
            cCell.addEventListener("click", function(){
                show(this.getElementsByClassName("dd")[0].textContent, startDay);
            });
        }
        cRow.appendChild(cCell);
        if ((i + 1) % 7 == 0) {
            cTable.appendChild(cRow);
            cRow = document.createElement("tr");
            cRow.classList.add("day");
        }
    }
    document.getElementsByClassName("cal-event")[0].innerHTML = "";
}

function show(day, startDay) {
    var title = document.createElement("h2");
    title.textContent = label.title;
    title.className += "event-title";

    // Date
    var selectedDate = document.createElement("h3");
    selectedDate.className += "evt-date";
    selectedDate.textContent = day + " " + monthNames[date.month] + " " + date.year;

    // Services
    var allServicesLabel = document.createElement("label");
    allServicesLabel.htmlFor = "service";
    allServicesLabel.className += "service-label";
    allServicesLabel.textContent = label.services;
    allServicesLabel.appendChild(document.createElement("br"));
    for (index in services) {
        var serviceLabel = document.createElement("label");
        serviceLabel.textContent = services[index].name;
        serviceLabel.classList.add("service");
        var serviceInput = document.createElement("input");
        serviceInput.required = true;
        serviceInput.type = "radio";
        serviceInput.value = index;
        serviceInput.name = "service";
        serviceInput.addEventListener("click", function() {
            show_services(services[this.value]);
        });
        allServicesLabel.appendChild(serviceInput);
        allServicesLabel.appendChild(serviceLabel);
    }

    // Hour
    var hoursLabel = document.createElement("label");
    hoursLabel.htmlFor = "hour";
    hoursLabel.textContent = label.hour;
    var hours = document.createElement("select");
    hours.className += "hour";
    var currentDay = (parseInt(day) + parseInt(startDay) + 5) % 7;
    for (var i = daysInfo[currentDay].openingHour; i < daysInfo[currentDay].closingHour; i ++) {
        var opt = document.createElement("option");
        opt.textContent = i + ":00";
        opt.value = i;
        hours.appendChild(opt);
    }
    hoursLabel.appendChild(hours);
    
    // Submit button
    var submit = document.createElement("button");
    submit.className += "submit";
    submit.type = "submit";
    submit.textContent = label.submit;

    // Form
    var form = document.createElement("form");
    form.addEventListener("submit", function (event) {
        if (currentUserId == null) {
            fillAccount();
        } else {
            var appointment = {
                name: "",
                details: [],
                date: day + "." + (date.month + 1) + "." + date.year,
                time: hours.options[hours.selectedIndex].text
            }

            // Add Appointment Details
            var serviceIndex = document.querySelector('input[name="service"]:checked').value;
            appointment.name = services[serviceIndex].name;

            var details = document.getElementsByClassName("details");
            for (var i = 0; i < details.length; i ++) {
                if (details[i].checked) {
                    appointment.details.push(details[i].value);
                }
            }
            
            if (appointment.details.length == 0) {
                appointment.details.push(account.unspecified);
            }

            // Send Info to Server
            fetch('http://localhost:3000/users')
            .then(function (response) {
                response.json().then(function (users) {
                    addAppointment(users[currentUserId], appointment);
                });
            });
            
            event.preventDefault();
        }
    });

    form.className += "form";
    form.appendChild(title);
    form.appendChild(selectedDate);
    form.appendChild(allServicesLabel);
    form.appendChild(document.createElement("br"));
    form.appendChild(hoursLabel);
    form.appendChild(submit);

    var container = document.getElementsByClassName("cal-event")[0];
    container.innerHTML = "";
    container.appendChild(form);
}

function show_services(service) {
    var serviceDetails = document.getElementsByClassName("service-details")[0];
    if (serviceDetails == null) {
        serviceDetails = document.createElement("div");
        serviceDetails.className += "service-details";
    } else {
        serviceDetails.innerHTML = "";
    }
    
    for (index in service.details) {
        var detailsLabel = document.createElement("label");
        detailsLabel.htmlFor = "details";
        detailsLabel.textContent = service.details[index].name;
        var detailsInput = document.createElement("input");
        detailsInput.className += "details";
        detailsInput.type = "checkbox";
        detailsInput.value = detailsLabel.textContent;
        serviceDetails.appendChild(document.createElement("br"));
        serviceDetails.appendChild(detailsInput);
        serviceDetails.appendChild(detailsLabel);
    }
    document.getElementsByClassName("service-label")[0].appendChild(serviceDetails);
}

function next_month() {
    if (date.month == 11) {
        date.month = 0;
        date.year ++;
    } else {
        date.month ++;
    }
    list();
}

function previous_month() {
    if (date.month == 0) {
        date.month = 11;
        date.year --;
    } else {
        date.month --;
    }
    list();
}
