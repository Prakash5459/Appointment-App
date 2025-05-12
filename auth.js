if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    console.log("Signup inputs:", name, email, password);

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const user = { name, email, password };

    try {
      localStorage.setItem(email, JSON.stringify(user));
      console.log("User saved. Redirecting to login page...");
      window.location.href = "index.html"; // Can change to window.location.replace() as well
    } catch (err) {
      console.error("Error saving user or redirecting:", err);
      alert("Something went wrong. Check the console for details.");
    }
  });
}


// Login logic
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = JSON.parse(localStorage.getItem(email));
    if (storedUser && storedUser.password === password) {
      localStorage.setItem('loggedInUser', email);
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials');
    }
  });
}
