
function showAppointments(user) {
    clearPage();

    if (user.appointments.length == 0) {
        var noAppointments = document.createElement("h3");
        noAppointments.textContent = account.noAppointments;
        document.getElementById("page-body").appendChild(noAppointments);
    }

    for (index in user.appointments) {
        var appointment = user.appointments[index];
        var appointmentBox = document.createElement("div");
        appointmentBox.className += "appointment-box"

        // Header
        var appointmentHeader = document.createElement("div");
        appointmentHeader.className += "appointment-header"

        // Service
        var title = document.createElement("h3");
        title.className += "account-title";
        title.textContent = appointment.name;
        appointmentHeader.appendChild(title);

        // Delete Button
        var deleteButton = document.createElement("button");
        deleteButton.className += "delete-button";
        deleteButton.value = index;
        deleteButton.addEventListener("click", function () {
            deleteAppointment(user, this.value);
        });
        deleteButton.innerText = account.delete;
        appointmentHeader.appendChild(deleteButton);

        // Specifics
        var detailBox = document.createElement("div");
        detailBox.className += "detail-box";
        for (detailIndex in appointment.details) {
            var detail = document.createElement("p");
            detail.textContent = appointment.details[detailIndex];
            detailBox.appendChild(detail);
        }

        // Time
        var time = document.createElement("div");
        time.className += "time";

        // Date
        var date = document.createElement("date");
        date.className += "date";
        date.textContent = appointment.date;
        time.appendChild(date);

        // Hour
        var hour = document.createElement("p");
        hour.textContent = appointment.time;
        time.appendChild(hour);

        // Final Appends
        appointmentBox.appendChild(appointmentHeader);
        appointmentBox.appendChild(detailBox);
        appointmentBox.appendChild(time);
        document.getElementById("page-body").appendChild(appointmentBox);
    }
}

function deleteAppointment(user, index) {
    if (!confirm(account.deleteMessage)) {
        return ;
    }

    user.appointments.splice(index, 1);

    fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(function () {
        fillAccount();
    });
}

function addAppointment(user, appointment) {
    user.appointments.push(appointment);

    fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(function () {
        fillAccount();
    });

    alert(account.appointmentCreateSuccess);
}
