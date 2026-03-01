/* Switch Pages */
function switchPage(page) {
    document.querySelectorAll('.box').forEach(b => b.classList.remove('show'));
    document.getElementById(page).classList.add('show');
}

/* Show / Hide Password */
function toggle(id) {
    let x = document.getElementById(id);
    x.type = x.type === "password" ? "text" : "password";
}

/* Password Strength */
function checkStrength() {
    let pass = document.getElementById("regPass").value;
    let bar = document.getElementById("strength");

    bar.style.width = (pass.length * 25) + "%";

    if (pass.length === 4) bar.style.background = "lime";
}

/* Register */
function register() {
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPass").value.trim();

    if (!email || !pass) return alert("Fill all fields!");

    if (pass.length !== 4 || isNaN(pass)) {
        alert("Password must be a 4-digit number!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        alert("User already exists!");
        return;
    }

    users.push({ email, password: pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created!");
    switchPage('loginPage');
}

/* Login */
function login() {
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    if (!email || !pass) return alert("Fill all fields!");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === pass);

    if (user) {
        localStorage.setItem("loggedInUser", email);

        switchPage('successPage');

        setTimeout(() => {
            switchPage('dashboardPage');
            document.getElementById("userInfo").innerText = "Logged in as: " + email;
        }, 1500);

    } else {
        alert("Invalid Email or Password!");
    }
}

/* Logout */
function logout() {
    localStorage.removeItem("loggedInUser");
    switchPage('loginPage');
}