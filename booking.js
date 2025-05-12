// Redirect to login if not logged in
if (!localStorage.getItem('loggedInUser') && window.location.pathname.includes('dashboard.html')) {
  alert("Please log in first.");
  window.location.href = 'index.html';
}

// Booking form logic
if (document.getElementById('bookingForm')) {
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const email = localStorage.getItem('loggedInUser');

    if (!email || !service || !date || !time) {
      alert("Please fill all fields and make sure you're logged in.");
      return;
    }

    const appointment = { service, date, time };
    const existing = JSON.parse(localStorage.getItem(`appointments-${email}`)) || [];
    existing.push(appointment);

    localStorage.setItem(`appointments-${email}`, JSON.stringify(existing));
    localStorage.setItem(`latest-appointment-${email}`, JSON.stringify(appointment));

    window.location.href = 'confirm.html';
  });
}

// Show previous appointments
if (document.getElementById('appointmentList')) {
  const email = localStorage.getItem('loggedInUser');
  const appointmentsKey = `appointments-${email}`;
  const allAppointments = JSON.parse(localStorage.getItem(appointmentsKey)) || [];

  const list = document.getElementById('appointmentList');
  list.innerHTML = allAppointments.length === 0
    ? "<li>No previous appointments found.</li>"
    : "";

  allAppointments.forEach((appt, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="appointment-info">
        <strong>${appt.service}</strong><br>
        on ${appt.date} at ${appt.time}
      </div>
      <button onclick="deleteAppointment(${index})" class="btn btn-delete">Delete</button>
    `;
    list.appendChild(li);
  });

  window.deleteAppointment = function (index) {
    const updated = allAppointments.filter((_, i) => i !== index);
    localStorage.setItem(appointmentsKey, JSON.stringify(updated));
    location.reload();
  };
}

// Confirmation page logic (if used elsewhere)
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

  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

// Logout
function logoutUser() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}
