/* MOCK DATABASE (localStorage) — Week 1 
   - Stores users under a single key.
   - Each user: { id, firstName, lastName, email, password }
   NOTE: Storing plain text passwords is NOT secure (teaching only).
*/

const DB_KEY = "app_users";         // string (primitive)
const SESSION_KEY = "current_user"; // which user is "logged in"

// Get all users (array of objects) or [] if nothing saved
export function getUsers() {
  // type conversion: parse JSON (string -> object/array)
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save full users array
export function saveUsers(users) {
  // students see: objects/arrays → turn into string via JSON.stringify
  localStorage.setItem(DB_KEY, JSON.stringify(users));
}

// Find user by email (string comparison)
export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
}

// Add user (object + array push)
export function addUser({ firstName, lastName, email, password }) {
  const users = getUsers();

  // comparison operators & conditionals
  if (findUserByEmail(email)) {
    return { ok: false, error: "Email already registered." };
  }

  // create new record (object literal)
  const newUser = {
    id: Date.now(), // number (primitive) – easy unique-ish id
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    email: String(email).trim(),
    password: String(password) // (Week 1: plain text; later: hash)
  };

  users.push(newUser); // array method
  saveUsers(users);
  return { ok: true, user: newUser };
}

// Session helpers (simple “logged in” flag)
export function setCurrentUser(email) {
  localStorage.setItem(SESSION_KEY, String(email));
}
export function getCurrentUser() {
  const email = localStorage.getItem(SESSION_KEY);
  return email ? findUserByEmail(email) : null;
}
export function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}
