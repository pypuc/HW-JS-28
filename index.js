const form = document.getElementById('contactForm');
const list = document.getElementById('contactsList');
let editIndex = null;

function loadContacts() {
  return JSON.parse(localStorage.getItem('contacts')) || [];
}

function saveContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function render() {
  const contacts = loadContacts();
  list.innerHTML = '';
  contacts.forEach((c, i) => {
    list.innerHTML += `
      <div class="contact">
        <strong>${c.first} ${c.last}</strong><br>
        Телефон: ${c.phone}<br>Email: ${c.email}
        <div class="actions">
          <button onclick="edit(${i})">✏️</button>
          <button onclick="remove(${i})">🗑️</button>
        </div>
      </div>`;
  });
}

form.onsubmit = e => {
  e.preventDefault();
  const contact = {
    first: form.firstName.value,
    last: form.lastName.value,
    phone: form.phone.value,
    email: form.email.value
  };
  const contacts = loadContacts();
  if (editIndex === null) contacts.push(contact);
  else contacts[editIndex] = contact;
  saveContacts(contacts);
  form.reset();
  editIndex = null;
  render();
};

window.edit = i => {
  const c = loadContacts()[i];
  form.firstName.value = c.first;
  form.lastName.value = c.last;
  form.phone.value = c.phone;
  form.email.value = c.email;
  editIndex = i;
};

window.remove = i => {
  const contacts = loadContacts();
  contacts.splice(i, 1);
  saveContacts(contacts);
  render();
};

render();
