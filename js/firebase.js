import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-performance.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3WPyL2hnlOvYqzu8bLuoMan4ylImW_q8",
  authDomain: "nirbhay-singh-naruka.firebaseapp.com",
  projectId: "nirbhay-singh-naruka",
  storageBucket: "nirbhay-singh-naruka.appspot.com",
  messagingSenderId: "613670928172",
  appId: "1:613670928172:web:a823c05c6715e5fe60b689",
  measurementId: "G-X2HFJWHWHT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const perf = getPerformance(app);

function openCustomPrompt() {
document.querySelector('.overlay').style.display = 'block';
document.querySelector('.prompt-box').style.display = 'block';
}

function closeCustomPrompt() {
document.querySelector('.overlay').style.display = 'none';
document.querySelector('.prompt-box').style.display = 'none';
}

async function submitAndReset() {
const userInputField = document.getElementById('userInput');
if (userInputField.value.trim() !== '') { 
openCustomPrompt(); 
} else {
alert("Please enter some text before sending."); 
}

}

document.querySelector('.prompt-send-btn').addEventListener('click', async function() {
const userInput = document.querySelector('.prompt-input').value;
const documentId = userInput ? userInput : `cancelled_${Date.now()}`;

try {
  await setDoc(doc(db, "messages", documentId), {
    text: userInput,
    timestamp: new Date()
  });
} catch (e) {
  console.error("Error adding document: ", e);
}

document.getElementById('userInput').value = ''; 
toggleResetButton();
closeCustomPrompt(); 
});

async function submitAndResetc() {
  const userInput = document.getElementById('userInput').value;
  const userId = `cancelled_${Date.now()}`;

  try {
    const docRef = await setDoc(doc(db, "messages", userId), {
      text: userInput,
      timestamp: new Date()
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
  document.getElementById('userInput').value = '';
  toggleResetButton();
}
function toggleResetButton() {
  const userInput = document.getElementById('userInput');
  const resetButton = document.querySelector('input[type="reset"]');
  resetButton.style.display = userInput.value ? 'inline' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('userInput');
  const resetButton = document.querySelector('input[type="reset"]');
  const form = document.getElementById('contactForm');
  const submitButton = document.querySelector('.fa-paper-plane');

  userInput.addEventListener('input', toggleResetButton);
  resetButton.addEventListener('click', () => setTimeout(toggleResetButton, 0));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitAndReset();
  });

  submitButton.addEventListener('click', submitAndReset);

  resetButton.style.display = 'none';
});

window.submitAndReset = submitAndReset;
window.submitAndResetc = submitAndResetc;
window.toggleResetButton = toggleResetButton;
