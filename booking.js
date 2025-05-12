// Redirect to login if not logged in
if (!localStorage.getItem('loggedInUser') && window.location.pathname.includes('dashboard.html')) {
  alert("Please log in first.");
  window.location.href = 'index.html';
}

// BOOKING FORM SUBMIT
if (document.getElementById('bookingForm')) {
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const email = localStorage.getItem('loggedInUser');

    if (!email) {
      alert("You are not logged in.");
      return;
    }

    if (!service || !date || !time) {
      alert("Please fill all fields.");
      return;
    }

    const appointment = { service, date, time };

    // Get existing appointments or initialize empty array
    const existing = JSON.parse(localStorage.getItem(`appointments-${email}`)) || [];

    // Add new appointment to array
    existing.push(appointment);

    // Save all appointments and latest separately
    localStorage.setItem(`appointments-${email}`, JSON.stringify(existing));
    localStorage.setItem(`latest-appointment-${email}`, JSON.stringify(appointment));

    // Redirect to confirmation page
    window.location.href = 'confirm.html';
  });
}

// SHOW PREVIOUS APPOINTMENTS WITH DELETE BUTTONS
if (document.getElementById('appointmentList')) {
  const email = localStorage.getItem('loggedInUser');
  const appointmentsKey = `appointments-${email}`;
  const allAppointments = JSON.parse(localStorage.getItem(appointmentsKey)) || [];

  const list = document.getElementById('appointmentList');

  if (allAppointments.length === 0) {
    list.innerHTML = "<li>No previous appointments found.</li>";
  } else {
    list.innerHTML = ""; // Clear first

    allAppointments.forEach((appt, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${appt.service}</strong> on ${appt.date} at ${appt.time}
        <button onclick="deleteAppointment(${index})" class="btn btn-delete">Delete</button>
      `;
      list.appendChild(li);
    });
  }

  // Delete function
  window.deleteAppointment = function(index) {
    const updated = allAppointments.filter((_, i) => i !== index);
    localStorage.setItem(appointmentsKey, JSON.stringify(updated));
    location.reload(); // Refresh the list
  };
}

// CONFIRMATION PAGE LOGIC
if (document.getElementById('confirmationDetails')) {
  const email = localStorage.getItem('loggedInUser');
  const appt = JSON.parse(localStorage.getItem(`latest-appointment-${email}`));

  if (appt) {
    document.getElementById('confirmationDetails').innerHTML = `
      <p><strong>Service:</strong> ${appt.service}</p>
      <p><strong>Date:</strong> ${appt.date}</p>
      <p><strong>Time:</strong> ${appt.time}</p>
    `;
  }
}

// LOGOUT FUNCTION
function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}
