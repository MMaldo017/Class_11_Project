/* AUTH CONTROLLER — wires your forms to the mock DB
    Week-1 concepts in comments:
   - variables: let/const
   - primitives (string/number/boolean), typeof, truthy/falsy
   - objects/arrays, property access (dot/bracket)
   - operators (assignment, +=, logical && || !)
   - comparisons (===, !==)
   - conditionals (if/else), ternary
   - string templates `Hello ${name}`
   - basic conversion (String(), Number(), Boolean())
*/

import {
  addUser, findUserByEmail,
  setCurrentUser, getCurrentUser
} from "./mockDb.js";

// small helper to show inline messages (teachable: early returns, truthy checks)
function showMessage(target, text, type = "error") {
  if (!target) return; // falsy guard
  target.textContent = String(text);
  target.className = `hint xsmall ${type === "ok" ? "success" : "error"}`;
}

// REGISTER PAGE HOOKUP
const registerForm = document.querySelector('form[action="/register"]');
if (registerForm) {
  const firstName = document.getElementById("firstName");
  const lastName  = document.getElementById("lastName");
  const email     = document.getElementById("email");
  const password  = document.getElementById("password");
  const confirm   = document.getElementById("confirm");
  const terms     = registerForm.querySelector('input[name="terms"]');

  // Create a spot for messages
  const formMsg = document.createElement("p");
  formMsg.className = "hint xsmall";
  registerForm.appendChild(formMsg);

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // don’t navigate (Week 1: client-only)

    // primitive types + typeof (use console to demo)
    // console.log(typeof email.value, typeof terms.checked);

    // truthy/falsy & basic checks
    if (!firstName.value || !lastName.value || !email.value || !password.value || !confirm.value) {
      showMessage(formMsg, "Please fill out all fields.");
      return;
    }
    if (password.value.length < 8) {
      showMessage(formMsg, "Password must be at least 8 characters.");
      return;
    }
    if (password.value !== confirm.value) {
      showMessage(formMsg, "Passwords do not match.");
      return;
    }
    if (!terms.checked) {
      showMessage(formMsg, "You must agree to the Terms.");
      return;
    }

    // objects + arrays
    const result = addUser({
      firstName: firstName.value,
      lastName:  lastName.value,
      email:     email.value,
      password:  password.value
    });

    // ternary
    result.ok
      ? showMessage(formMsg, `Welcome, ${firstName.value}! Account created. Redirecting to login…`, "ok")
      : showMessage(formMsg, result.error);

    if (result.ok) {
      // tiny delay so they can read the message
      setTimeout(() => window.location.href = "login.html", 600);
    }
  });
}

// LOGIN PAGE HOOKUP
const loginForm = document.querySelector('form[action="/login"]');
if (loginForm) {
  const email    = document.getElementById("email");
  const password = document.getElementById("password");
  const formMsg  = document.createElement("p");
  formMsg.className = "hint xsmall";
  loginForm.appendChild(formMsg);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // find in “db”
    const user = findUserByEmail(email.value);

    // logical operators && ||
    if (!user || user.password !== password.value) {
      showMessage(formMsg, "Invalid email or password.");
      return;
    }

    setCurrentUser(user.email);

    // template literal + conditional flavor
    showMessage(formMsg, `Great to see you, ${user.firstName}! Logging you in…`, "ok");
    setTimeout(() => {
      // for Week 1, just go back to home; later this could be /dashboard
      window.location.href = "../App/index2.html";
    }, 600);
  });
}

// OPTIONAL: greet current user if they’re logged in (demo read from “session”)
// You can paste this snippet into App/index2.html later to show a banner.

const who = getCurrentUser();
if (who) {
  const banner = document.createElement("p");
  banner.className = "xsmall";
  banner.textContent = `Signed in as ${who.firstName} ${who.lastName} (${who.email})`;
  document.body.prepend(banner);
};

