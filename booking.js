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

    const appointment = { service, date, time };

    // Get existing appointments or initialize empty array
    const existing = JSON.parse(localStorage.getItem(`appointments-${email}`)) || [];

    // Add new appointment to array
    existing.push(appointment);

    // Save back to localStorage
    localStorage.setItem(`appointments-${email}`, JSON.stringify(existing));

    window.location.href = 'confirm.html';
  });
}
// SHOW PREVIOUS APPOINTMENTS
if (document.getElementById('appointmentList')) {
  const email = localStorage.getItem('loggedInUser');
  const allAppointments = JSON.parse(localStorage.getItem(`appointments-${email}`)) || [];

  if (allAppointments.length === 0) {
    document.getElementById('appointmentList').innerHTML = "<li>No previous appointments found.</li>";
  } else {
    document.getElementById('appointmentList').innerHTML = allAppointments
      .map(appt => `<li><strong>${appt.service}</strong> on ${appt.date} at ${appt.time}</li>`)
      .join('');
  }
}

// Confirmation logic
if (document.getElementById('confirmationDetails')) {
  const email = localStorage.getItem('loggedInUser');
  const appt = JSON.parse(localStorage.getItem(`appointment-${email}`));
  if (appt) {
    document.getElementById('confirmationDetails').innerHTML = `
      <p><strong>Service:</strong> ${appt.service}</p>
      <p><strong>Date:</strong> ${appt.date}</p>
      <p><strong>Time:</strong> ${appt.time}</p>
    `;
  }
}
