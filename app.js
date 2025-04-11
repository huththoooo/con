// Firebase import & config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDKj4i9xunI9d--uU5yG5Lf86fgKYlMfWQ",
  authDomain: "sl-number-finder.firebaseapp.com",
  projectId: "sl-number-finder",
  storageBucket: "sl-number-finder.firebasestorage.app",
  messagingSenderId: "235702134881",
  appId: "1:235702134881:web:4ca8d41c7187a9d8c5e220",
  measurementId: "G-QZD1P56V73",
  databaseURL: "https://sl-number-finder-default-rtdb.firebaseio.com"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Contact Picker API
document.getElementById('getContacts').addEventListener('click', async () => {
  try {
    const supported = "contacts" in navigator && "ContactsManager" in window;
    if (!supported) {
      alert("Your browser doesn't support the Contact Picker API.");
      return;
    }

    const props = ["name", "tel"];
    const opts = { multiple: true };

    const contacts = await navigator.contacts.select(props, opts);

    contacts.forEach(contact => {
      const contactRef = push(ref(database, 'contacts'));
      set(contactRef, {
        name: contact.name[0],
        tel: contact.tel[0]
      });
    });

    alert("📤 Contacts successfully saved to Firebase!");

  } catch (error) {
    console.error("Error accessing contacts:", error);
    alert("❌ Contact access failed or was denied.");
  }
});
